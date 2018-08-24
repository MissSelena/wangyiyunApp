<template>
    <div id="login">
         <div class="top"><span class="left" @click="returnTop"> &lt; </span><span class="text">手机号登录</span> </div>
        <mu-container>
            
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                <mu-form-item  prop="phone"  name='phone'>
                   <!-- <img src="../../../login/public/images/3.png" alt=""> -->
                <mu-text-field v-model="validateForm.phone" prop="phone" placeholder=" 手机号:" ></mu-text-field>
                </mu-form-item>
                <mu-form-item label="" prop="password"  name='password'>
                     <!-- <img src="../../../login/public/images/2.png" alt=""> -->
                    <mu-text-field type="password" v-model="validateForm.password" prop="password" placeholder=" 密码:"></mu-text-field>
                </mu-form-item>
              
                <mu-form-item>
                <mu-button color="primary" @click="submit" class="BTN">登录</mu-button>
              
                </mu-form-item>
                 <mu-form-item>
                    <!-- <mu-button  class="clearPwd"></mu-button> -->
                    <p @click="clear" class="clearPwd">重置密码</p>
                </mu-form-item>
            </mu-form>
        </mu-container>
                 <!-- <router-link to='/index/reg'>没有账号？点击注册</router-link> -->
    </div>
</template>
<script>
import axios from "axios";
// import { configIP } from "./IP";
export default {
    data() {
        return {
            validateForm: {
                phone: '',
                password: '',
                config_IP: 'http://172.20.10.11:7888'

            }
        }
    },
    methods: {
        returnTop() {
            this.$router.push("/index/reg");
        },
        submit() {
            this.$refs.form.validate().then((result) => {
                let param = {
                    phone: this.validateForm.phone, password: this.validateForm.password
                }
                axios.post(this.validateForm.config_IP + "/login", param).then((msg) => {
                    if (msg.data == "t") {
                        this.$router.push("/index/main");
                    } else {
                        this.$router.push("/index/login");
                    }
                });

            });
        },
        clear() {
            this.$refs.form.clear();
            this.validateForm.password = ''
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
  border-radius: 25px;
  background: rgb(211, 58, 50);
  margin-top: 1rem;
   opacity: 0.8;
}
.clearPwd {
  margin: 0 auto;
  margin-top: .5rem;
  color: #9a9a9a;
  text-decoration: #9a9a9a;
}
</style>