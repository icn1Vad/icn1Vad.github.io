import { getCollection } from 'astro:content';
export async function getSiteData(){
  const writing=await getCollection('writing');
  const cases=await getCollection('projects');
  return {articles:writing.map(e=>({...e.data,slug:e.id,body:e.body})).sort((a,b)=>['ceph-storage','hadoop-spark','kubernetes-lab','openstack-lab'].indexOf(a.slug)-['ceph-storage','hadoop-spark','kubernetes-lab','openstack-lab'].indexOf(b.slug)),projects:cases.map(e=>({...e.data,slug:e.id,body:e.body})).sort((a,b)=>a.order-b.order)};
}
