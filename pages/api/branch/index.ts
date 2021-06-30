import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Op, Sequelize } from "sequelize"
import db from "../../../models/index.js"

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

const handler = nextConnect()
  .get(async (req:NextApiRequest, res:NextApiResponse) => {
      const params:QueryParams = req.query
      const page = params.hasOwnProperty('page')?params.page:0

      let res2 = await db.branch.findAll({
          limit:10,
          include:[
            { model: db.meal },
          ]
      })

      res.status(200).json({
        success:true,
        data:res2
      })
  })
  .post(async (req:NextApiRequest, res:NextApiResponse) => {
      const body = req.body
      let error = ''

      if( parseFloat(body.lat) < -11 || parseFloat(body.lat) > 7) {
          error = "Latitude of Indonesia Country is not valid, it must between -10 to 7"
      } 

      if( parseFloat(body.lng) < 95 || parseFloat(body.lng) > 141 ) {
          error = "Longitude of Indonesia Country is not valid, it must between 96 to 141"
      }

      if( error ) {
         res.status(400).json({
            success:false,
            error:error
          })
      } else {

          const model = await db.branch.findOne({
            where: { name: body.name }
          });

          if( ! model ) {
            await db.branch.create({
                name:body.name,
                open:body.open,
                close:body.close,
                lat:parseFloat(body.lat),
                lng:parseFloat(body.lng)
            })

            res.status(200).json({
                success:true,
                message:"New branch has been created"
            })
          } else {
             res.status(400).json({
                success:false,
                error:"Branch name is already exists"
             })
          }
      }
  })

export default handler
