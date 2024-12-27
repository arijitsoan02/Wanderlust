const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.createReview=async(req,res,next)=>{
    let listing=await Listing.findById(req.params.id);
    let newRev=new Review(req.body.review);
    newRev.author=req.user._id;
    listing.reviews.push(newRev);
    await newRev.save();
    await listing.save();

    console.log("saved successfully");
    req.flash("success","New Review saved !");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review Deleted !");
    res.redirect(`/listings/${id}`);
};