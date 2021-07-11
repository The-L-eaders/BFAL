import React, {useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Typography from '@material-ui/core/Typography';
import myCookie from 'react-cookies'

import superAgent from "superagent";
const useStyles = makeStyles((theme) => ({
    addCircle: {
        color: '#fff',
        marginTop: 30,
        fontSize: 50,
        backgroundColor: '#3f51b5',
        width: 190,
        height: 190,
        borderRadius: 190/2,
        display: 'flex',
        justifyContent: 'center',
        textAlign:'center'
     
    },
    text:{
        margin:50,
        marginTop:60
    },
    text1:{
        margin:10,
        marginTop:10
    },
    root: {
        display: 'flex',
        marginLeft:30,
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      img:{
          width:190,
          height:130
      },
      card:{
         boxShadow:` 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 50px 80px rgba(0, 0, 0, 0.12)`, borderRadius:'10px', border:'1px solid gray',backgroundColor:'#EFEFEF',borderBlockColor:'#3f51b5',margin:'1%'

      }
  }));

function Profile(){

    const style=useStyles()
    const [user,setUser]= useState({})
        const [flag,setFlag]=useState(true)
       

    useEffect(()=>{
        superAgent
      .post('https://bid-fast-and-last.herokuapp.com/getUser')
      .send({token:myCookie.load("token")})
      .then((data)=>{
          setUser(data.body)
      })
      .catch(e=>console.log(e))
        
    },[])

    
    return(
         <>
         {user.userName?
            
             <Grid container spacing={3}>
             <Grid item xs={12} sm={2} >
            <div className={style.addCircle}><p className={style.text}>{user.userName}</p></div>
            </Grid>
            <Grid item xs={12} sm={9}>
            <Card
                className={style.card}
                style={{marginTop:90}}
              >
            <div style={{margin:'4%'}}>
                <Typography variant="h5"  color="textSecondary" >{user.email}</Typography >
                <Typography variant="h6"  color="textSecondary" >{user.userName}</Typography >
                {/* <Typography variant="h6"  color="textSecondary" >i have {user.cart.length} product in my cart</Typography > */}
            </div>
            </Card>
            </Grid>
            <Grid item xs={12} sm={2}>
            <div className={style.root}>
            <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
          >
                <Button >my info</Button>
                <Button onClick={()=>setFlag(true)}>My Products {user.product.length}</Button>
                <Button onClick={()=>setFlag(false)}   startIcon={<AddShoppingCartIcon />}>My Cart {user.cart.length}</Button>
                </ButtonGroup>
            </div>
            </Grid>
            <Grid item xs={12} sm={9}>
            <Card
                className={style.card}
                style={{marginTop:2,height: 600, overflow: 'auto'}}
              >
                <Typography variant="h5"  color="textSecondary" className={style.text}>{flag?'My Products':'My Cart'}</Typography >
            <div style={{margin:'3%',display: 'flex',flexDirection: 'row'}}>
                
                {flag && user.product.length ? user.product.map(product=>{
                    return(
                    <Card className={style.card} style={{width:350}}>
                       
                    <CardMedia className={"img"} image={product.productImage} />
                    <img src={product.productImage} width="250" height="180" style ={{marginLeft:'35px',marginTop:'10px'}}/>
                    <Typography variant="h5"  color="textSecondary" className={style.text1} >name :{product.productName}</Typography> 
                    <Typography variant="h6"  color="textSecondary" className={style.text1} >startingPrice :{product.startingPrice}</Typography>
                    <Typography variant="h6"  color="textSecondary" className={style.text1} >status :{product.status}</Typography>
                    </Card>
                    )
                }): 
                user.cart.length ?
                user.cart.map(product=>{
                    return(
    
                    <Card className={style.card} style={{width:350}}>
    
                        <CardMedia className={"img"} image={product.image} />
                    <img src={product.image} width="250" height="180" style ={{marginLeft:'35px',marginTop:'10px'}}/>
                    <Typography variant="h5"  color="textSecondary" className={style.text1} >name :{product.name}</Typography> 
                    <Typography variant="h6"  color="textSecondary" className={style.text1} >Price :{product.price}</Typography>
                    <Typography variant="h6"  color="textSecondary" className={style.text1} >description :{product.description}</Typography>
                       
                    </Card>
                    )
                })
                :null
            }
            </div>
            </Card>
            </Grid>
            </Grid>
             
             :null}
             </>
         


    )

    

}


export default Profile;
