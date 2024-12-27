const Listing=require("../models/listing");

module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.rendernewForm=async(req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.showListing=async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
        req.flash("failure","Listing you searched for does'nt exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("./listings/show.ejs",{listing});
};

module.exports.renderEditForm=async(req,res)=>{
    const {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
        req.flash("failure","Listing you searched for does'nt exist");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }

    req.flash("success","Listing updated !");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted !");
    res.redirect("/listings");
};

module.exports.newListingAdd=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    
    let newListing=new Listing (req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New listing created !");
    res.redirect("/listings");
};