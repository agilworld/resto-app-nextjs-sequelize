import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Op, Sequelize } from "sequelize"
import db from "../../../models/index.js"
import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'


interface ResponseListData {
  success:boolean;
  data:any|[];
}

interface ResponseData {
  success:boolean;
  message?:string;
  errors?:any
}

type Data = ResponseListData | ResponseData

interface QueryParams2 {
  branch:number;
  page?:number;
  limit?:number;
}

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  })
)

const handler = nextConnect()
  .use(async (req:NextApiRequest, res:NextApiResponse, next)=>{
    await cors(req, res)
    next()
  })
  .get(async (req:NextApiRequest, res:NextApiResponse) => {
      const params:any = req.query
      const page = params.hasOwnProperty('page')?params.page:0

      let res2 = await db.meal.findAll({
          where:{
            branch_id:params.branch
          },
          limit:10
      })

      res.status(200).json({
        success:true,
        data:res2
      })
  })
  .post(async (req:NextApiRequest, res:NextApiResponse) => {
    const body = req.body

    if( body.name == '' ) {
      res.status(400).json({
        success:false,
        error:"Meal name is required"
      })
    } else {
        const data = await db.meal.findOne({
            where: { name: body.name, branch_id:parseInt(body.branch) }
        })
       
        if( data ) {
            res.status(400).json({
                success:false,
                error:"Meal is already exists"
            })
        } else {
            await db.meal.create({
                name:body.name,
                branch_id:parseInt(body.branch)
            })
            res.status(200).json({
                success:true,
                message:"New meal has been created"
            })
        }
    }
    
})

export default handler
