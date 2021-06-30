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
 * info: Branch
 * /api/branch/[slug]:
 *   get:
 *     description: Get single branch
 *     summary: Single Branch
 *     responses:
 *       '200':
 *         description: Success retrive single data
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
 *   put:
 *     description: Update a branch
 *     summary: Update Branch
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
 *   delete:
 *     description: Delete a branch
 *     summary: Delete Branch
 *     responses:
 *       '200':
 *         description: Success delete data
 *                       
 */
const handler = nextConnect()
    .get(async (req:NextApiRequest, res:NextApiResponse) => {
        const { slug } = req.query;
        const data = await db.branch.findOne({
            where: {
                id: slug,
            },
            include:[
                { model: db.meal },
            ]
        });

        if( data ) {
            res.status(200).json({
                success:true,
                data:data
            })
        } else {
            res.status(400).json({
                success:false,
                error:"No branch exist"
            })
        }
        
    })
  .put(async (req:NextApiRequest, res:NextApiResponse) => {
      const body = req.body
      const { slug } = req.query;
      if( parseFloat(body.lat) < -11 || parseFloat(body.lat) > 7) {
        res.status(400).json({
          success:false,
          error:"Latitude of Indonesia Country is not valid, it must between -10 to 7"
        })
        return
      }

      if( parseFloat(body.lng) < 95 || parseFloat(body.lng) > 141 ) {
          res.status(400).json({
            success:false,
            error:"Longitude of Indonesia Country is not valid, it must between 96 to 141"
          })
          return
      }

      const model = await db.branch.findOne({
        where: {
            id: slug,
        }
      });
      
      if( model ) {
        const data = await db.branch.update(
            {
                name:body.name,
                open:body.open,
                close:body.close,
                lat:parseFloat(body.lat),
                lng:parseFloat(body.lng)
            },
            {
                where: {
                    id: slug,
                }
            }
        );

        res.status(200).json({
          success:true,
          message:"branch has been updated"
        })
      } else {
        res.status(400).json({
          success:false,
          error:"Branch name is not exists"
        })
      }
      
  })

export default handler
