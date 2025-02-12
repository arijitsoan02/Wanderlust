const User=require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup=async (req,res)=>{
    try{
        let {username,email,password}=req.body;

        let newUser=new User({email,username});
        const regdUser=await User.register(newUser,password);
        console.log(regdUser);
        req.login(regdUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to wanderlust !");
            res.redirect("/listings");
        })
    } catch(err){
        req.flash("failure",err.message);
        res.redirect("/signup");
    }

};

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","welcome back to wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out now !");
        res.redirect("/listings");
    });
};