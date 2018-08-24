<template>
    <div class="centent">
        <div class="top">
            <img class="top-left" @click="$router.history.go(-1)" src="../../../login/public/images/aa7.png" alt="">
               <div>
                   <p class="music_name">{{musicList.music_name}}</p>
                   <p class="plear_name">{{musicList.plear_name}}</p>
               </div>
            <img  src="../../../login/public/images/aau.png" alt="">
        </div>
        <div>
            <img class="image_1" src="../../../login/public/images/ae0.png" alt="">        
            <img class="record" src="../../../login/public/images/ace.png" alt="">
            <img class="record1" src="../../../login/public/images/20180817102827.png" alt="" :style="{transform:'rotateZ('+transformZ+'deg)'}">
        </div>
            <div class="four-img">
                <img src="../../../login/public/images/note_btn_love_white_dis.png" alt="">
                <img src="../../../login/public/images/a3w.png" alt="">
                <img src="../../../login/public/images/aai.png" alt="">
                <img src="../../../login/public/images/a3a.png" alt="">
            </div>
              <!-- 进度条 -->
<div>
    <div class="time-conditions">
        <div class="time-text">{{cTime}}</div>
        <div class="bar">
            <div class="progressbar" @click="playMusic" ref="runfatbar">
                <div class="greenbar" ref="runbar">
                <span class="yuan" draggable="true"></span>
                </div>
            </div>
            <div class="circleProgress_wrapper">
            <div class="wrapper right">
                <div class="circleProgress rightcircle" ref="yuanright"></div>
            </div>
            <div class="wrapper left">
                <div class="circleProgress leftcircle" ref="yuanleft"></div>
            </div>
         </div>
            </div>
        <div class="right-time time-text">{{dTime}}</div>
    </div>
    <!-- //播放音乐按钮 -->
    <div class="audio-btn">
        <img class="order" src="../../../login/public/images/ags.png" alt="">
        <img class="icon-left" src="../../../login/public/images/note_btn_pre_white.png" alt="" @click="switchAudio('top')">
        <img src="../../../login/public/images/a_f.png" alt="" :class="play ? 'icon-stop' : 'icon-play'" @click="audioState" id='palyer'> 
        <img src="../../../login/public/images/note_btn_next_white.png" alt="" class="icon-right2" @click="switchAudio('bottom')">
        <img class="list" src="../../../login/public/images/p4.png" alt=""> 
    </div>
    <div @click="clickImg(item)">
      <audio ref="player" :src="IP + /images/+musicList.music"></audio>
    </div>
  </div>  
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  // name: 'music-view',
  // components: {
  // },
  // props: {
  //   type: '',
  // },

  data() {
    return {
      musicList: {
        list_img: "",
        music: "",
        music_name: "",
        plear_name: ""

      },
      id: location.href.split('?'),
      cTime: '00:00', // 已播放时间
      dTime: '00:00', // 总播放时间
      play: false, // 播放暂停按钮
      audioHttp: '../../../login/public/images/邓丽君 - Rhythm Of The Rain.mp3', // 音频链接
      imgurl: '../../../login/public/images/a_f.png',  //图片切换
      imgurl1: '../../../login/public/images/a_b.png',
      IP: 'http://172.20.10.11:7888',
      transformZ: 0,
      intervalImg: ''
    }
  },
  created() {
    axios.post(this.IP + '/music').then(msg => {
      for (let i = 0; i < msg.data.length; i++) {
        if (msg.data[i]._id === this.id[1]) {
          this.musicList = msg.data[i];
        }
      }
    });
  },
  mounted() {
    const music = this.$refs.player  // 音频所在对象
    const musicBar = this.$refs.runbar  // 颜色进度条所在对象
    const musicWidth = this.$refs.runfatbar.offsetWidth // 底部进度条总宽
    const rightCircle = this.$refs.yuanright.style // 圆形滚动进度条右边
    const leftCircle = this.$refs.yuanleft.style // 圆形滚动进度条左边

    // 获得音频加载完成可播放时的处理
    music.addEventListener('canplay', () => {
      console.log('can=', music)
      const musicTime = music.duration // 获得音频时长
      const branch = Math.floor(musicTime / 60) // 计算音频分钟
      const second = Math.ceil(musicTime % 60) // 计算音频秒
      if (branch < 10 && second < 10) { // 四种情况判断音频总时间
        this.dTime = `0${branch}:0${second}`
      } else if (branch < 10) {
        this.dTime = `0${branch}:${second}`
      } else if (second < 10) {
        this.dTime = `${branch}:0${second}`
      } else {
        this.dTime = `${branch}:${second}`
      }
    })

    // 获得音频正在播放时的处理
    music.addEventListener('timeupdate', () => {
      const musicTime = music.duration // 获得音频时长
      const circleTime = musicTime / 360 // 计算总时长占据360度每一度的比例
      const stopTime = music.currentTime // 获得已播放的音频时长
      const rightDeg = -135 + (stopTime / circleTime) // 计算出当前旋转度数
      if (rightDeg < 45) { // 如果当前度数小于45就证明在右边
        rightCircle.display = 'block' // 显示右边圆
        rightCircle.transform = `rotate(${rightDeg}deg)` // 赋值给CSS右边圆旋转度数
        leftCircle.display = 'none' // 隐藏左边园（预防切歌的时候右边已清除）
      } else if (rightDeg === 45 || rightDeg > 45) { // 如果当前度数等于或大于45就证明在左边
        rightCircle.display = 'block' // 显示右边圆（预防直接点击快进的时候右边无显示）
        leftCircle.display = 'block'  // 显示左边圆
        rightCircle.transform = 'rotate(45deg)' // 固定右边旋转度数
        const leftDeg = -135 + ((stopTime - (musicTime / 2)) / circleTime) // 计算出当前左边旋转度数
        leftCircle.transform = `rotate(${leftDeg}deg)` // 赋值给CSS右边圆旋转度数
      }
      musicBar.style.width = `${(stopTime / musicTime) * 100}%` // 计算进度条所在比例宽度
      const branch = Math.floor(stopTime / 60) // 计算已播放的音频分钟
      const second = Math.floor(stopTime % 60) // 计算已播放的音频秒
      if (branch < 10 && second < 10) { // 四种情况判断显示音频以播放时间
        this.cTime = `0${branch}:0${second}`
      } else if (branch < 10) {
        this.cTime = `0${branch}:${second}`
      } else if (second < 10) {
        this.cTime = `${branch}:0${second}`
      } else {
        this.cTime = `${branch}:${second}`
      }
    })
    // 监听颜色进度条是否触摸拖动
    musicBar.addEventListener('touchmove', (event) => {
      const events = event.targetTouches[0].pageX // 获得触摸拖动的距离
      musicBar.style.width = `${(events / musicWidth) * 100}%` // 计算进度条所在比例宽度
      music.pause() // 触摸拖动时停止播放
    })

    // 监听颜色进度条是否触摸拖动结束
    musicBar.addEventListener('touchend', () => {
      const touwidth = (musicBar.offsetWidth / musicWidth) // 计算进度条所在比例
      music.currentTime = music.duration * touwidth // 通过所在比例赋值给音频应在的播放时间
      music.play() // 根据播放时间开始播放
      this.play = true // 更改播放暂停按钮为播放
    })
  },

  computed: {
  },

  methods: {
    clickImg(item) {
      this.$router.push('/music' + "?" + item._id);
    },
    // 点击进度条事件
    playMusic(e) {
      const music = this.$refs.player // 音频所在对象
      const barWidth = e.pageX / this.$refs.runfatbar.offsetWidth // 计算点击位置相对父元素总宽的比例
      this.$refs.runbar.style.width = `${barWidth * 100}%` // 进度条应所在的比例总宽
      this.$refs.runbar.style.background = 'red' // 进度条应所在的比例总宽
      music.currentTime = music.duration * barWidth // 计算点击时应播放所在的时间
      music.play() // 播放音频
      this.play = true // 更改播放暂停按钮为播放
    },
    // 点击播放暂停按钮时间
    audioState() {
      this.play = !this.play // 更改播放暂停按钮状态
      const music = this.$refs.player // 音频所在对象
      console.log(music)
      if (this.play) {
        music.play(); // 播放音乐
        this.imgTransform();
        this.imgurl;
      } else {
        music.pause() // 暂停音乐
        clearInterval(this.intervalImg);
        this.imgurl1;
      }

    },

    // 切换歌曲按钮
    switchAudio(value) {
      if (value === 'top') {
        this.audioHttp = '../../../login/public/images/Jocelyn Pook,Russian Red - Loving Strangers.mp3'
      } else if (value === 'bottom') {
        this.audioHttp = '../../../login/public/images/Joan Jett & the Blackhearts - I Hate Myself For Loving You.mp3'
      }
      this.play = false // 播放按钮为暂停
      this.$refs.runbar.style.width = 0 // 清空颜色进度条
      this.$refs.yuanright.style.display = 'none' // 清空圆形颜色进度条
      this.$refs.yuanleft.style.display = 'none' // 清空圆形颜色进度条
    },
    imgTransform() {
      this.intervalImg = setInterval(()=>{
        this.transformZ += 1;
      },40);
    }
  },
}


</script>

<style scoped>
* {
  margin: 0;
  bottom: 0;
}
/* 最上面 */
.top {
  background: rgb(56, 55, 53);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
}
.top img {
  width: 1.6rem;
  height: 1.6rem;
}
.plear_name,
.music_name {
  color: #ffffff;
  text-align: center;
}
.centent {
  background: rgb(131, 155, 154);
  width: 100%;
  height: 40rem;
}
.top-left {
  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  transition: transform 0.5s;
}
.top-left {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transition: transform 0.1s;
}
/* 光碟 */
.image_1 {
  width: 4.2rem;
  height: 6.2rem;
  margin-left: 11rem;
  position: absolute;
  top: 2.9rem;
  z-index: 2;
}
.record {
  margin-top: 3rem;
  width: 16rem;
  height: 16rem;
  margin-left: 4rem;
  position: relative;
}
.record1 {
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  position: absolute;
  top: 9.2rem;
  right: 5.9rem;
}
/* 音乐磁盘旋转 */
.start {
  animation: rotate 8s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.stop {
  -webkit-animation-play-state: paused;
}

/* 四个小图标 */
.four-img {
  display: flex;
  justify-content: space-around;
  margin: 3rem;
}
.four-img img {
  width: 2rem;
  height: 1.5rem;
}

/* 进度条 */
.circleProgress_wrapper {
  width: 14rem;
  /* height: 2rem; */
  /* position: relative; */
  /* border: 2px solid #e5e5e5; */
  /* opacity: 0.2; */
  /* margin-top: 0.5rem; */
  /* border-radius: 0.1rem; */
  /* margin-left: 1.5rem; */
}

.wrapper {
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 0;
  overflow: hidden;
}

.right {
  right: 0;
}

.left {
  left: 0;
}

.circleProgress {
  width: 2rem;
  height: 2rem;
  border: 2rem solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 0;
}

.rightcircle {
  /* border-top: 2rem solid #1296db; */
  /* border-right: 2rem solid #1296db; */
  right: 0;
  transform: rotate(-135deg);
  display: none;
}

.leftcircle {
  /* border-bottom: 2rem solid #1296db; */
  /* border-left: 2rem solid #1296db; */
  left: 0;
  transform: rotate(-135deg);
  display: none;
}

.bar {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
}
.progressbar {
  width: 100%;
  height: .5rem;
  background-color: #e5e5e5;
  margin-top: .5rem;
  border-radius: 2rem;
  position: relative;
}
/* .yuan { */
  /* display: inline-block;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute; */
  /* top: 1rem; */
  /* right: 0.4rem; */
/* } */
.greenbar {
  width: 0%;
  height: .5rem;
  border-radius: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #1296db;
}
.time-text {
  display: inline-block;
  padding: 0 2rem;
  box-sizing: border-box;
  color: #e5e5e5;
}

.right-time {
  text-align: right;
}
.time-conditions {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
/* 播放按钮和进度条上下曲 */
/* .audio-btn img {
  width: 2.2rem;
  height: 2.2rem;
} */

.audio-btn {
  width: 100%;
  height: 4.5rem;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.order {
  width: 1.8rem;
  height: 1.8rem;
}
.icon-left,
.icon-right2 {
  width: 1.8rem;
  height: 1.8rem;
}
#palyer {
  width: 2.5rem;
  height: 2.5rem;
}
.list {
  width: 3rem;
  height: 3rem;
}
/*. icon {
  @include size(80, 80);
  display: inline-block;
  margin-right: 2rem(20);
  vertical-align: middle;

  $icon-list: right2 left play stop;
  @each $icon in $icon-list {
    &.icon-#{$icon} {
      @include background-cover("icon-#{$icon}.png");
    }
  }
} */
</style>
