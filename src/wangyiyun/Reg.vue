<template>
 <div id="reg">
         <div class="top"><span class="left" @click="$router.history.go(-1)"> &lt; </span><span class="text">手机号注册</span> </div>
         <form action="http://172.20.10.11:7888/reg" method="post"></form>
            <mu-container>
            <mu-form ref="form" :model="validateForm"  class="mu-demo-form">
                <mu-form-item  prop="phone" :rules="phoneRules" name='phone'>
                   <!-- <img src="../../../login/public/images/3.png" alt=""> -->
                <mu-text-field v-model="validateForm.phone" prop="phone" placeholder="+86 输入手机号" ></mu-text-field>
                </mu-form-item>
                <mu-form-item label="" prop="password" :rules="passwordRules" name='password'>
                    <!-- <img src="../../../login/public/images/2.png" alt=""> -->
                    <mu-text-field type="password" v-model="validateForm.password" prop="password" placeholder=" 设置登录密码，不少于6位"></mu-text-field>
                </mu-form-item>
                <mu-form-item>
                <mu-button color="primary" @click="submit" class="BTN">下一步</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-container>     

        <div class="down">
            <p class="textReg"> ---------其它方式注册---------</p>
            <div class="img_text">
                <figure><img class="image" src="../../../login/public/images/a88.png" alt=""/>
                <figcaption>微信</figcaption>
            </figure>
                 <figure><img class="image" src="../../../login/public/images/a84.png" alt=""/>
                <figcaption>QQ</figcaption>
            </figure>
             <figure><img class="image" src="../../../login/public/images/a86.png" alt=""/>
                 <figcaption>微博</figcaption>
            </figure>
             <figure><img class="image" src="../../../login/public/images/a82.png" alt=""/>
                 <figcaption>网易邮箱</figcaption>
            </figure>                
            </div>
        </div>          
    </div>
</template>


<script>
import axios from "axios";
// import {configIP} from "./IP";
export default {
    data() {
        return {
            phoneRules: [
                { validate: (val) => !!val, message: '必须填写手机号' },
                { validate: (val) => val.length === 11, message: '用户名长度等于11' }
            ],
            passwordRules: [
                { validate: (val) => !!val, message: '必须填写密码' },
                { validate: (val) => val.length >= 6 && val.length <= 10, message: '密码长度大于6小于10' }
            ],

            validateForm: {
                phone: '',
                password: '',
                config_IP: ''

            }
        }
    },
    methods: {
        returnTop() {
            this.$router.push("/index/login");
        },
        submit() {
            this.$refs.form.validate().then((result) => {
                //  let param = {
                //     phone: this.validateForm.phone, password: this.validateForm.password
                // }
                // axios.post("http://172.20.10.11:7888/reg",{}).then(msg => {
                this.$router.push("/index/login");
                // });

            });
        }
    }
};

</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
.left {
  margin-left: 2rem;
  font-size: 3rem;
  color: aliceblue;
  opacity: 0.7;
}
.text {
  margin-left: 5rem;
  font-size: 1.4rem;
  color: #ffffff;
  opacity: 0.8;
}
.top {
  background: rgb(211, 58, 50);
  opacity: 0.7;
}

.mu-demo-form {
  width: 100%;
  max-width: 46rem;
}

.BTN {
  width: 20rem;
  height: 2.8rem;
  margin: 0 auto;
  border-radius: 2.5rem;
  background: rgb(211, 58, 50);
  margin-top: 1.5rem;
  opacity: 0.8;
}
.clearPwd {
  margin: 0 auto;
  margin-top: 2.5rem;
  color: #9a9a9a;
  text-decoration: #9a9a9a;
}

/* 下面 */
.down {
  margin-top: 15rem;
}
.textReg {
  text-align: center;
  color: #9a9a9a;
}
.img_text {
  display: flex;
  justify-content: space-around;
  color: #9a9a9a;
  margin-top: 25px;
}
.image {
  width: 3.6rem;
  height: 3.6rem;
}
figcaption {
  text-align: center;
}
</style>