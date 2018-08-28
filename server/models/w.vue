
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0,
    type:'',
    brand:'',
    price:0,
    category:'',
    url:'',
    discount:0,
    img:'',
    products : [],
    isAdmin:false,
    isLogin:false,
    cart:[],
    total: 0,
    report:[],
    idPro:'',
    name:'',
    email:'',
    password:'',
    address:'',
    city:'',
    search:''
  },
  mutations: {
    count(state,payload){
      state.count = payload
    },
    type(state,payload){
      state.type = payload
    },
    brand(state,payload){
      state.brand = payload
    },
    price(state,payload){
      state.price = payload
    },
    category(state,payload){
      state.category = payload
    },
    disc(state,payload){
      state.discount = payload
    },
    url(state,payload){
      state.url = payload
    },
    img(state,payload){
      state.img = payload
    },
    products(state,payload){
      state.products = payload
    },
    isAdmin(state,payload){
      state.isAdmin = payload
    },
    isLogin(state,payload){
      state.isLogin = payload
    },
    cart(state,payload){
      state.cart.push(payload)
    },
    total(state,payload){
      state.total += payload
    },
    report(state,payload){
      state.report = payload
    },
    idPro(state,payload){
      state.idPro = payload
    },
    name(state,payload){
      state.name = payload
    },
    email(state,payload){
      state.email = payload
    },
    password(state,payload){
      state.password = payload
    },
    address(state,payload){
      state.address = payload
    },
    city(state,payload){
      state.city = payload
    },
    search(state,payload){
      state.search = payload
    }
  },
  actions: {
    register({commit,dispatch},payload){
      axios.post('http://localhost:3000/register',{
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        city: this.state.city
      })
      .then( token =>{
        localStorage.setItem('token',token.data.token)
        this.state.name = ''
        this.state.email = ''
        this.state.password = ''
        this.state.address = ''
        this.state.city = ''
        swal("", "You success register!", "success")
        .then(value=>{
          router.push('/')
          dispatch('locStorage')
        })
        .catch(err=>{
          console.log(err);
        })     
      })
      .catch( err =>{
        console.log(err);
      })
    },
    selectedImage({commit,dispatch},payload){
      commit('img',payload.target.files[0])
    },
    addProduct({commit,dispatch},payload){
      let formData = new FormData()
      formData.append('image',this.state.img)

      axios.post('http://localhost:3000/upload',formData)
      .then(result=>{

        console.log("success upload to bucket");
        if(!this.discount || this.discount>100 || this.discount<0){
          this.state.discount=0
        }
        axios.post('http://localhost:3000/items/add',{
          type : this.state.type,
          brand : this.state.brand,
          price : this.state.price,
          category : this.state.category,
          discount : this.state.discount,
          url : result.data.link,
        })
        .then(product=>{
            this.state.type = ''
            this.state.brand = ''
            this.state.price = 0
            this.state.category = ''
            this.state.discount = 0
            this.state.img = ''
            dispatch('listAllPro')
          console.log('success add to database');
        })
        .catch(err=>{
          console.log(err);
        }) 
      })
      .catch(err=>{
        console.log(err);
        
      })
    },
    listAllPro({commit,dispatch},payload){
      axios.get('http://localhost:3000/items')
      .then( products =>{
        // console.log(products.data);
        
        commit('products', products.data)
      })
      .catch( err =>{
        console.log(err);
      })
    },
    listCategory({commit,dispatch},payload){
      axios.get(`http://localhost:3000/items/category/${payload}`)
      .then( product =>{
        // console.log(product.data);
        commit('products', product.data)       
      })
    },
    locStorage({commit,dispatch},payload){
      var token = localStorage.getItem('token')
      if(!token){
        commit('isLogin',false)
        commit('isAdmin',false)
      }
      else{
        axios.get('http://localhost:3000/verify',{
          headers:{token:token}
        })
        .then( result =>{
          if(result.data){
            commit('isLogin',true)
          }
          if(result.data.isAdmin){
            commit('isAdmin',true)
          }
  
        })
        .catch( err =>{
          console.log('you must login');
        })
      }
    },
    Logout({commit,dispatch},payload){
      localStorage.clear()
      swal("", "You success logout!", "success")
      .then(value=>{
        router.push('/')
        dispatch('locStorage')
        // router.push('/todo')
      })
      .catch(err=>{
        console.log(err);
      })
      
    },
    addCart({commit,dispatch},payload){
      // console.log(payload);
      var status = false
      var count = this.state.cart

      if(payload.product.discount>0){
        payload.product.harga = payload.discount
        payload.product.total = payload.discount
      }
      else{
        payload.product.harga = payload.product.price
        payload.product.total = payload.product.price
      }

      for( var i = 0; i < count.length; i++){
        if( this.state.cart[i]._id ==  payload.product._id ){
            payload.product.qty += 1
            commit('total',payload.product.total)
            commit('cart', payload.product)
            this.state.cart.splice(count.length-1,1)
            commit('count',this.state.cart.length)
            status = true    
        }
      }
      if(!status){
        payload.product.qty = 1
        commit('total',payload.product.total)
        commit('cart', payload.product)
        commit('count',count.length)       
      }
      
    },
    listReport({commit,dispatch},payload){
      axios.get('http://localhost:3000/transactions')
      .then( trans =>{
        // console.log(trans.data);
        commit('report',trans.data)
      })
      .catch( err =>{
        console.log(err);
        
      })
    },
    valEdit({commit,dispatch},payload){
      commit('type',payload.type)      
      commit('brand',payload.brand)
      commit('price',payload.price)
      commit('category',payload.category)
      commit('disc',payload.discount)
      commit('url',payload.url)
      commit('idPro',payload._id)
    },
    valAdd({commit,dispatch},payload){
      this.state.type = ''
      this.state.brand = ''
      this.state.price = 0
      this.state.category = ''
      this.state.discount = 0
      this.state.img = ''
    },
    Edit({commit,dispatch},payload){
      if(!this.discount || this.discount>100 || this.discount<0){
        this.state.discount=0
      }
      if(this.state.img){
        let formData = new FormData()
        formData.append('image',this.state.img)
        axios.post('http://localhost:3000/upload',formData)
        .then(result=>{
          console.log("success upload to bucket");
          this.state.url = result.data.link
        })
        .catch(err=>{
          console.log(err);
          
        })
      }
      axios.put(`http://localhost:3000/items/edit/${this.state.idPro}`,{
        type : this.state.type,
        brand : this.state.brand,
        price : this.state.price,
        category : this.state.category,
        discount : this.state.discount,
        url : this.state.url,
      })
      .then(product=>{
          this.state.type = ''
          this.state.brand = ''
          this.state.price = 0
          this.state.category = ''
          this.state.discount = 0
          this.state.img = ''
          swal("", "You success edit a product!", "success")
          .then(value=>{                 
            dispatch('listAllPro')
          })
          .catch(err=>{
              console.log(err);
          }) 
        console.log('success add to database');
      })
      .catch(err=>{
        console.log(err);
      }) 
    },
    Delete({commit,dispatch},payload){
      axios.delete(`http://localhost:3000/items/delete/${payload}`)
      .then( delpro =>{
        // console.log(delpro);
        dispatch('listAllPro')
      })
      .catch( err =>{
        console.log(err);
      })
    },
    Login({commit,dispatch},payload){
      axios.post('http://localhost:3000/login',{
        email: this.state.email,
        password: this.state.password
      })
      .then( token =>{
        localStorage.setItem('token',token.data.token)
        this.state.email = ''
        this.state.password = ''
        swal("", "You success login!", "success")
        .then(value=>{
          router.replace('/')
          dispatch('locStorage')
        })
        .catch(err=>{
          console.log(err);
        })
        // router.push('/')
      })
      .catch( err =>{
        console.log(err);
      })
      
    },
    Checkout({commit,dispatch},payload){
      var token = localStorage.getItem('token')
      axios.get('http://localhost:3000/verify',{
        headers:{token:token}
      })
      .then(result =>{
        axios.post('http://localhost:3000/transactions/add',{
          email: result.data.email,
          total: this.state.total
        })
        .then(trans =>{
          this.state.count = 0
          this.state.cart = []
          this.state.total = 0
          swal("", "You success checkout!", "success")
        })
        .catch(err=>{
          console.log(err);
          
        })
        
      })
      .catch( err=>{
        console.log(err);
        
      })


    },
    Search({commit,dispatch},payload){
      axios.get(`http://localhost:3000/items/search?q=${this.state.search}`)
      .then(result=>{
        commit('products', result.data)       
      })
      .catch(err =>{
        console.log(err);
        
      })
    },
    deleteItem({commit,dispatch},payload){
      this.state.total -= Number(payload.harga)
      var status = false
      for(var i = 0; i < this.state.cart.length; i++){
        if(this.state.cart[i]._id==payload._id){
          if(this.state.cart[i].qty<=1){
            this.state.cart.splice(i,1)
            status = true;
          }
          else{
            this.state.cart[i].qty -= 1
            status = true;
          }
        }
      }
      if(!status){
        payload.qty = 0
        // console.log(this.state.cart);
        
        this.state.cart.push(payload)
      }
      else{
        // console.log(this.state.cart);
      }
    },
    addItem({commit,dispatch},payload){
      this.state.total += Number(payload.harga)
      for(var i = 0; i < this.state.cart.length; i++){
        if(this.state.cart[i]._id==payload._id){
            this.state.cart[i].qty += 1
        }
      }
    }
  }
})
© 2018 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
Press h to open a hovercard with more details.