<template>
    <div class="center">
        <div class="top">
            <span class="left" @click="$router.history.go(-1)"> &lt; </span><span class="text">歌单</span>
       <div><span class="dot">. . . </span> <img src="../../../login/public/images/a3b.png" alt=""></div> 
         </div>
    <div class="img-num">
        <div class="header" v-for='item in list' :key="item.id">
            <img  :src="ip + /images/+item.img" alt="" class="header-img">
            <div class="header-right">
                <p class="header-text">{{item.text}}</p>
                <p><img class="header-img1" :src="ip + /images/+item.header" alt=""> <span class="header-name">{{item.name}} ></span> </p>
            </div>
         </div>
         <div class="number-people">
              <figure>
                  <img  src="../../../login/public/images/afz.png" alt=""/>
                <figcaption>3002</figcaption>
                </figure>
                 <figure><img  src="../../../login/public/images/aai.png" alt=""/>
                <figcaption>301</figcaption>
            </figure>
             <figure><img src="../../../login/public/images/aau.png" alt=""/>
                <figcaption>49</figcaption>
            </figure>
             <figure><img src="../../../login/public/images/a3w.png" alt=""/>
                <figcaption>下载</figcaption>
            </figure>
           
         </div>
    </div>
    <!-- 播放全部 -->
    <div>
        <div class="playMusic">
            <div>
                <img class="img"  src="../../../login/public/images/a3d.png" alt="">
                <span class="text">播放全部<span class="text1">(共7首)</span></span>
            </div>
            <img class="img1" src="../../../login/public/images/aeh.png" alt="">
        </div>
        <div class="playMusic-list">
            <ul>
                <li @click="clickImg(item)"  v-for='(item,index) in this.music' :key="index.id">
                    <div class="left-name">
                        <span>{{index+1}}</span>
                    <div>
                       <p>{{item.music_name}}</p> 
                       <p class="playMusic-text">{{item.plear_name}}</p> 
                    </div>
                    </div>                   
                    <div>
                    <img src="../../../login/public/images/a0s.png" alt="">
                    <img src="../../../login/public/images/a16.png" alt="">
                    </div>                   
                </li>
            </ul>
        </div>
    </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    data() {
        return {
            list: [],
            music: [],
            ip: 'http://172.20.10.11:7888',
            id: location.href.split('?')
        }
    },
    created() {
        axios.post(this.ip + '/musicList').then(msg => {
            for (let i = 0; i < msg.data.length; i++) {
                if (msg.data[i]._id === this.id[1]) {
                    this.list.push(msg.data[i])
                }
            }
        });
        axios.post(this.ip + '/musicList', { submitType: "findJoin", ref: ['musicIp'] }).then(msg => {
            for (let i = 0; i < msg.data.length; i++) {
                if (msg.data[i]._id === this.id[1]) {
                    msg.data[i].musicIp.map(item => {
                        return this.music.push(item);
                    })
                }
            }
        });
    },
    methods: {
        clickImg(item) {
            this.$router.push('/music' + "?" + item._id);
            console.log(1);
            
        }
    }
}
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
.center {
  overflow: scroll;
  height: 45rem;
}
.top {
  background: rgb(50, 50, 50);
  /* opacity: 0.7; */
  color: aliceblue;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  /* line-height: 2.6rem; */
}
.top img {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.8rem;
}
.left {
  margin-top: 0.8rem;
}
.text {
  margin-top: 0.8rem;
}
.dot {
  margin-right: 1rem;
}
/* 图片和数据 */
.img-num {
  background: rgb(50, 50, 50);
  /* opacity: 0.7; */
}
.header {
  display: flex;
  padding-top: 1rem;
}
.header-right {
  margin-left: 1rem;
}
.header-img {
  width: 8rem;
  height: 8rem;
  margin-left: 1.5rem;
}
.header-text {
  color: rgb(220, 220, 220);
  font-size: 1rem;
  width: 10rem;
  margin-top: 0.5rem;
}
.header-img1 {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-top: 0.5rem;
}
.header-name {
  color: #999999;
  margin-left: 0.2rem;
  font-size: 0.8rem;
}
/* 数据 */
.number-people {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-bottom: 1rem;
}
figure img {
  width: 2rem;
  height: 2rem;
}
figcaption {
  color: rgb(220, 220, 220);
  text-align: center;
}
/* 播放音乐 */
.playMusic {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.8rem;
}
.img {
  width: 2rem;
  height: 2rem;
  margin-top: 0.5rem;
}
.img1 {
  width: 2.8rem;
  height: 2.8rem;
}
.text {
  font-size: 1.2rem;
  text-align: center;

  margin-left: 1rem;
}
.text1 {
  font-size: 1rem;
  color: #999999;
}

.playMusic-list li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  border-bottom: 0.01rem  solid #e5e5e5;
}
.left-name {
  display: flex;
  margin-left: 1rem;
}
.left-name span {
  font-size: 1.2rem;
  color: #999999;
  margin-right: 0.9rem;
}
.playMusic-list img {
  width: 1.5rem;
  height: 1.5rem;
}
.playMusic-text{
    font-size: 0.8rem;
    color: #999999;
}
</style>
