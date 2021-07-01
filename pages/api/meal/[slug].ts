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

interface QueryParams {
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
        const { slug } = req.query;
        const data = await db.meal.findOne({
            where: {
                id: slug,
            }
        });

        if( data ) {
            res.status(200).json({
                success:true,
                data:data
            })
        } else {
            res.status(400).json({
                success:false,
                error:"No meal exist"
            })
        }
        
    })
  .put(async (req:NextApiRequest, res:NextApiResponse) => {
      const body = req.body

      if( body.name == '' ) {
        res.status(400).json({
          success:false,
          error:"Meal name is required"
        })
      } else {
          const [newBranch, created] = await db.branch.findOrCreate({
            where: { name: body.name, branch_id:body.branch },
            defaults:{
              name:body.name,
              branch_id:body.branch
            }
          })
    
          if( created ) {
            res.status(200).json({
              success:true,
              error:"New meal has been created"
            })
          } else {
            res.status(400).json({
              success:false,
              error:"Meal is already exists"
            })
          }
      }
  })
  .delete(async (req:NextApiRequest, res:NextApiResponse) => {
    const body = req.body

    const { slug } = req.query;
    const data = await db.meal.destroy({
        where: {
            id: slug,
        }
    });

    res.status(200).json({
        success:true,
        message:"successfully deleted"
    })
})

export default handler