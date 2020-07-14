const {models:{Delivery}}= require("facturator-data")
module.exports=async()=>{
    const deliveries= await Delivery.find().populate({
        path:"products",
        populate:{
            path:"product",
            model:"Product"
        }
    }).populate({path:"client"}).lean()
    const results= []
    for(let i=0;i<deliveries.length;i++){
        const delivery={}
        delivery.id= deliveries[i]._id.toString()
        delivery.client={}
        delivery.client.id=deliveries[i].client._id.toString()
        delivery.client.name=deliveries[i].client.name
        delivery.paid=deliveries[i].paid
        delivery.date= deliveries[i].date
        delivery.amount= deliveries[i].amount
        results.push(delivery)
    }
    return results
}