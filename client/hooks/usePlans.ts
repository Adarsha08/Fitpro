'use client'

import { useEffect, useState } from "react"
import {getAllPlans} from '@/lib/services/adminServices'

export const usePlans=()=>
{
    //place to store the fetched data 
    const [plans,setPlans]=useState([])
    const [loading,setLoading]=useState(true)


    const fetchPlans=async()=>
    {
        try{
            const data=await getAllPlans()
            setPlans(data)
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
        fetchPlans()
    },[])
    return {plans,loading,refetch:fetchPlans}
}
