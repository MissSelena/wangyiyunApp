<template>
    <div class="center">
      <div class="top">
        <!-- 搜索 -->
        <div class="search">
          <img class="sing" src="../../../login/public/images/identify_widget_icn_new.png" alt="">
          <input type="text" placeholder=" 搜索音乐、视屏、歌词、电台">
          <!-- <img src="../../../login/public/images/af3.png" alt=""> -->
          <img  class="change" src="../../../login/public/images/af3.png" alt="">
        </div>
        <div>
          <p class="nav-text"><span>音乐</span><span>视屏</span><span>电台</span></p>
          <!-- 轮播 -->
          <div>
            <mu-carousel transition="fade" class="slideshow"> 
                <mu-carousel-item>
                  <img :src="carouselImg1" class="slideshow-img">
                </mu-carousel-item>
                <mu-carousel-item>
                  <img :src="carouselImg2" class="slideshow-img">
                </mu-carousel-item>
                <mu-carousel-item>
                  <img :src="carouselImg3" class="slideshow-img">
                </mu-carousel-item>
                <mu-carousel-item>
                  <img :src="carouselImg4" class="slideshow-img">
                </mu-carousel-item>
            </mu-carousel>
          </div>
          <!-- 图文 -->
         <div class="image-text">
           <figure><img class="image" src="../../../login/public/images/t_recommend_icn_fm.png" alt=""/>
                <figcaption>私人FM</figcaption>
            </figure>
            <figure><img class="image" src="../../../login/public/images/t_recommend_icn_daily.png" alt=""/>
                <figcaption>每日推荐</figcaption>
            </figure>
            <figure><img class="image" src="../../../login/public/images/t_recommend_icn_playlist.png" alt=""/>
                <figcaption>歌单</figcaption>
            </figure>
            <figure><img class="image" src= "../../../login/public/images/t_recommend_icn_rank.png" alt=""/>
                <figcaption>排行榜</figcaption>
            </figure>
         </div>
        </div>
      </div>
      <div>
        <p class="list">推荐歌单<span> > </span></p> 
        <div class="imagesText">          
          <div @click="clickImg(item)" v-for='item in list' :key="item.id" class="music-list">
            <img :src="ip + /images/+item.img" alt="">
            <p>{{item.text}}</p>
          </div>
      
        </div>
     
      </div>
      <!-- 下面导航 -->
       <div class="down">          
          <router-link to='/index/main'>
           <figure><img class="image" src="../../../login/public/images/t_actionbar_discover_normal.png" alt=""/>
                <figcaption>发现音乐</figcaption>
            </figure>
          </router-link>
          <router-link to='/index/myMusic'> <figure><img class="image" src="../../../login/public/images/t_actionbar_music_normal.png" alt=""/>
                <figcaption>我的音乐</figcaption>
            </figure></router-link>
          <router-link to='/index/friends'> <figure><img class="image" src="../../../login/public/images/t_actionbar_friends_normal.png" alt=""/>
                 <figcaption>朋友</figcaption>
            </figure></router-link>
          <router-link to='/index/login'> <figure><img class="image" src="../../../login/public/images/t_actionbar_video_normal.png" alt=""/>
                 <figcaption>账号</figcaption>
            </figure></router-link>          
        </div>             
    </div>

</template>

<script>
import carouselImg1 from '../../../login/public/images/u=1855499351,2715566496&fm=27&gp=0.jpg'
import carouselImg2 from '../../../login/public/images/u=1890576570,2642992570&fm=27&gp=0.jpg'
import carouselImg3 from '../../../login/public/images/u=2322250041,240362071&fm=27&gp=0.jpg'
import carouselImg4 from '../../../login/public/images/u=2387344736,3679669890&fm=27&gp=0.jpg'
import axios from 'axios'
export default {
  data() {
    return {
      carouselImg1,
      carouselImg2,
      carouselImg3,
      carouselImg4,
      list: [],
      ip: 'http://172.20.10.11:7888',
      imgUrl: '../../../login/public/images'
    }
  },
  created() {
    axios.post(this.ip + '/musicList').then(msg => {
      this.list = msg.data;
    })
  },
  methods: {
    clickImg(item) {
      this.$router.push('/musicList' + "?" + item._id);
    }
  }
};


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.center {
  overflow: scroll;
  height: 56rem;
}
/* 搜索 */
.search {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-around;
  background: rgb(211, 58, 50);
}
input {
  width: 15rem;
  height: 2.5rem;
  border-radius: 1.5rem;
  outline: none;
  padding-left: 2.5rem;
  border: none;
  margin-top: 1.2rem;
  position: relative;
}
.sing,
.change {
  width: 3rem;
  height: 3rem;
  margin-top: 1rem;
}

/* 音乐导航 */
.nav-text {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 3rem;
  border-bottom: 0.1rem solid #e5e5e5;
  line-height: 3rem;
}
.nav-text span {
  border-bottom: 0.1rem solid transparent;
}
.nav-text span:hover {
  color: rgb(211, 58, 50);
  border-bottom: 0.1rem solid rgb(211, 58, 50);
}

/* 轮播图 */
.slideshow-img {
  width: 18rem;
  height: 15em;
}
.slideshow {
  width: 100%;
  height: 15em;
}
/* 图文 */
.image-text {
  display: flex;
  justify-content: space-around;
  height: 5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 5.5rem;
  border-bottom: 0.1rem solid #e5e5e5;
}
.image-text img {
  width: 3.5rem;
  height: 3.5rem;
}

/* 推荐歌单 */
.list {
  line-height: 2rem;
  border-left: 0.3rem solid rgb(211, 58, 50);
  margin-bottom: 1rem;
  padding-left: 1rem;
  font-size: 1.4rem;
  color: #9a9a9a;
}
/* 图文列表 */

.list span {
  margin-left: 1rem;
}
.music-list > img {
  width: 7.5rem;
  height: 8rem;
}
.imagesText {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.imagesText p {
  width: 7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
  color: #000;
}
/* 下面导航 */
.down {
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: rgb(52, 39, 23);
  position: fixed;
  bottom: 0;
}
.down img {
  width: 4.5rem;
  height: 3rem;
}
figcaption {
  text-align: center;
  color: gray;
}
</style>

