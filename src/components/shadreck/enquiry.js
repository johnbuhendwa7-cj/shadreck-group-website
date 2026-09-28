export async function deliverEnquiry(endpoint,payload,fetcher=fetch){
 const response=await fetcher(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw new Error('Delivery failed');
 const result=await response.json();
 if(result.delivered!==true)throw new Error('Delivery was not confirmed');
 return result;
}
export function validateEnquiry(data){
 const errors=[];
 if(!data.name.trim())errors.push(['name','Please enter your name.']);
 if(!data.phone.trim()&&!data.email.trim())errors.push(['phone','Please provide a phone number or email address.']);
 if(data.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))errors.push(['email','Please enter a valid email address.']);
 if(!data.message.trim())errors.push(['message','Please describe your project.']);
 return errors;
}
export function bindEnquiry(form,site,services){
 const status=form.querySelector('#form-status'),button=form.querySelector('[type=submit]');
 button.hidden=false;
 const slug=new URLSearchParams(location.search).get('service');
 if(services.some(s=>s.slug===slug))form.elements.service.value=slug;
 if(site.enquiryEndpoint){button.firstChild.textContent='Send enquiry ';form.querySelector('#form-help').textContent='Please provide your project details and at least one way to contact you.';}
 form.addEventListener('input',e=>e.target.removeAttribute('aria-invalid'));
 form.addEventListener('submit',async event=>{
  event.preventDefault();status.textContent='';
  const data=Object.fromEntries(new FormData(form));
  if(data.website)return;
  if(!services.some(s=>s.slug===data.service))data.service='general';
  const errors=validateEnquiry(data);
  form.querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
  if(errors.length){status.textContent=errors.map(e=>e[1]).join(' ');errors.forEach(([id])=>{form.elements[id].setAttribute('aria-invalid','true');form.elements[id].setAttribute('aria-describedby','form-status');});form.elements[errors[0][0]].focus();return;}
  const label=services.find(s=>s.slug===data.service)?.title||'General enquiry';
  if(!site.enquiryEndpoint){
   const body=`Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${label}\nProject location: ${data.location}\n\n${data.message}`;
   const href=`mailto:${site.email}?subject=${encodeURIComponent('Website enquiry: '+label)}&body=${encodeURIComponent(body)}`;
   status.textContent='Your email draft is ready. Opening it does not send your enquiry. Send it from your email app, or call Shadreck if no app opens.';
   const link=document.createElement('a');link.href=href;link.textContent='Open email draft';link.className='text-link';status.append(document.createElement('br'),link);link.click();
   return;
  }
  button.disabled=true;status.textContent='Sending your enquiry…';
  try{await deliverEnquiry(site.enquiryEndpoint,data);status.textContent='Your enquiry was delivered. Thank you for contacting Shadreck Group.';form.reset();}
  catch{status.textContent='Your enquiry could not be confirmed as delivered. Please try again, email Shadreck or call '+site.phone+'.';}
  finally{button.disabled=false;}
 });
}
