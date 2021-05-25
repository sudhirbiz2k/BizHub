
const GoogleStrat=require('passport-google-oauth20');
const User=require('../models/UserModel');
const GitStrat=require('passport-github')
const session=require('express-session')
const jwt=require('jsonwebtoken')
module.exports=function(app,passport){

        app.use(passport.initialize());
        app.use(passport.session());
        app.use(session({secret:'keyboard cat',resave:false,saveUninitialized:true,cookie:{secure:false}}));
        passport.serializeUser((user,done)=>{
            token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'60h'})
            console.log(process.env.JWT_SECRET)
            console.log(token)
            done(null,user.id);
        })
        //////////////decrypted user /////
        passport.deserializeUser((id,done)=>{
            User.findById(id).then((user)=>{
                done(null,user)
            })
        
        })

    passport.use(new GoogleStrat({
      
        callbackURL:'/auth/google/redirect',
        clientID:"",
        clientSecret:"",
    
    },(accessToken,refreshToken,profile,done)=>{ 
        
       
        ////check if user already exists///
        User.findOne({googleid:profile.id})
        .then((currentUser)=>{
            if(currentUser){
                console.log(currentUser)
           
                //already have the user
                done(null,currentUser)
            }else{
                new User({
                    username:profile.displayName,
                    googleid:profile.id,
                    email:profile.emails[0].value,
                    photo:profile.photos[0].value
                }).save().then((newuser)=>{
                 
                   
                    done(null,newuser)
                })
    
            }
    
        })
         
    }))

    passport.use(new GitStrat({
        clientID:"",
        clientSecret:"",
        callbackURL:"http://localhost:8000/auth/github/redirect",
        
    },(accessToken,refreshToken,profile,done)=>{
        console.log(profile)
        User.findOne({gitid:profile.id})
        .then((currentUser)=>{
            if(currentUser){
                //already have the user
               
                done(null,currentUser)
            }else{
                new User({
                    username:profile.username,
                    gitid:profile.id,
                    email:profile._json.email,
                    photo:profile.photos[0].value
                }).save().then((newuser)=>{
                
                    done(null,newuser)
                })
    
            }
        })
    }))
    app.get('/auth/github',passport.authenticate('github',{scope:'user:email'}))
    app.get('/auth/github/redirect',passport.authenticate('github'),(req,res)=>{ 
        res.redirect('http://localhost:8100/profile?from=social')
    })
    app.get('/auth/google/redirect',passport.authenticate('google'),(req,res)=>{
        res.redirect('http://localhost:8100/profile?from=social')
    app.get('/auth/getSocialToken',(req,res)=>{
        res.json({success:true, token})
    })
     
    })
    app.get('/auth/google',passport.authenticate('google',{scope:['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email']}))

    return passport

    
}