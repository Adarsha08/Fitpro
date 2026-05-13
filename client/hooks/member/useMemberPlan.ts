'use client'
import { useEffect, useState } from "react"
import {getMemberPlans} from '@/lib/services/memberServices'

export const useMemberPlan=()=>
{
    //place to store the fetched data 
    const[memberPlan,setmemberPlan]=useState<any[]>([])
    const [loading,setLoading]=useState(true)
    const fetcheMemberPlan=async()=>
    {
        try{
            const memberplans=await getMemberPlans()
            setmemberPlan(memberplans)
           
            
        }
        catch(err:any)
        {
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>
    {
        fetcheMemberPlan()
    },[])
    return {memberPlan,loading,refetch:fetcheMemberPlan}
}
