import express from 'express'

const router = express.Router();

router.get("/", async (req, res) => {
    try{   
        res.json(
            {
                status: 200, 
                message: 'Hermes Express API is up and running!'
            }
        )
    }catch (error) {
        console.log(error);
        return res.status(500).send('Error with express api')
    }
});

export default router;