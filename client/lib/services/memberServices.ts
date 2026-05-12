import api from "../api"
export const getMemberPlans=async()=>
{
    const res=await api.get('/member/view-plans')
    return res.data
}