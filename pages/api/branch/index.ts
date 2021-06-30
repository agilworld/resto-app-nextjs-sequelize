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

/**
 * @swagger
 * name: Branch
 * /api/branch:
 *   get:
 *     description: Get all branch list
 *     summary: Branch List
 *     parameters:
 *     - name: page
 *       description: page limit
 *     - name: limit
 *       description: offset index
 *     responses:
 *       '200':
 *         description: Success retrive list data
 *         content:
 *            application/json:
 *               examples:
 *                  Branch:
 *                    value:
 *                      success: true
 *                      data:
 *                          name: "branch 1" 
 *                          open: "09.00" 
 *                          close: "21.00" 
 *                          lat: 1.2313131 
 *                          lng: 103.4213
 *                          createdAt: (time) 
 *                          updatedAt: (time) 
 *                          Meals: [(data meal)]
 * 
 *   post:
 *     description: Create new branch
 *     summary: Create Branch
 *     parameters:
 *     - name: name
 *       id: name
 *       description: branch name
 *     - name: open
 *       description: open time
 *     - name: close
 *       description: closed time
 *     - name: lat
 *       description: Latitude coordinate
 *     - name: lng
 *       description: Longitude coordinate
 *     responses:
 *       '200':
 *         title: Success
 *         content:
 *            application/json:
 *               examples:
 *                  Success:
 *                    value:
 *                      success: true
 *                      message: "success"
 *       '400':
 *         description: Error reject
 *         content:
 *            application/json:
 *               examples:
 *                  Has exists:
 *                    value:
 *                      success: false
 *                      error: "Branch name is already exists"
 *                  Latitude:
 *                    value:
 *                      success: false
 *                      error: "Latitude of Indonesia Country is not valid, it must between -10 to 7"
 *                  Longitude:
 *                    value:
 *                      success: false
 *                      error: "Longitude of Indonesia Country is not valid, it must between 96 to 141"
 *                       
 */

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
