<template>
  <view>
    <!--  自定义顶部导航栏 -->
    <pageHeader />
    <!-- 轮播 -->
    <view class="swiper">
      <view class="swiper-box">
        <swiper circular="true" autoplay="true" @change="swiperChange">
          <swiper-item v-for="item in swiperList" :key="item.id"><image :src="item.img"></image></swiper-item>
        </swiper>
        <view class="indicator">
          <view :class="{ on: currentSwiper >= index }" class="dots" v-for="(swiper, index) in swiperList" :key="index"></view>
        </view>
      </view>
     </view>
  </view>
</template>

<script>
import pageHeader from './pageHeader.vue';
import api from '@/utils/api.js';

export default {
  data() {
    return {
      categoryList: [],
      promotion: [],
      swiperList: [],
      currentSwiper: 0
    };
  },
  components: {
    pageHeader
  },
  onLoad() {
    this.getMallData();
  },
  methods: {
    async getMallData() {
      const params = {
        url: api.getMallData
      };
      const result = await this.request(params);
      this.swiperList = result.data.swiperList;
      this.categoryList = result.data.categoryList;
      this.swiperList = result.data.swiperList;
    },
    swiperChange(e) {
      this.currentSwiper = e.detail.current;
    }
  }
};
</script>

<style scoped lang="scss">
.swiper {
  width: 100%;
  margin-top: 10upx;
  display: flex;
  justify-content: center;

  .swiper-box {
    width: 92%;
    height: 30.7vw;
    overflow: hidden;
    border-radius: 15upx;
    box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
    //兼容ios，微信小程序
    position: relative;
    z-index: 1;

    swiper {
      width: 100%;
      height: 30.7vw;

      swiper-item {
        image {
          width: 100%;
          height: 40vw;
        }
      }
    }

    .indicator {
      position: absolute;
      bottom: 20upx;
      left: 20upx;
      background-color: rgba(255, 255, 255, 0.4);
      width: 150upx;
      height: 5upx;
      border-radius: 3upx;
      overflow: hidden;
      display: flex;

      .dots {
        width: 0upx;
        background-color: rgba(255, 255, 255, 1);
        transition: all 0.3s ease-out;

        &.on {
          width: (100%/3);
        }
      }
    }
  }
}
</style>
