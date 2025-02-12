const joi=require("joi");

module.exports.listingSchema=joi.object({
    listing : joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        location : joi.string().required(),
        country : joi.string().required(),
        price : joi.number().required().min(100),
        image : joi.string().allow("",null),
    }).required()
});

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().max(5).min(1),
        comment:joi.string().required()
    }).required()
})