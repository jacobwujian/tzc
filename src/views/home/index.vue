<template>
  <div class="c-home-index pb-50">
    <a-row>
      <a-col
        style="margin-left: 35px"
        :span="15"
      >
        <div class="index-container">
          <!-- 搜索条件 -->
          <a-form-model
            ref="searchForm"
            layout="inline"
            :model="form"
            class="search-form"
          >
            <a-row
              class="form-row"
              type="flex"
              align="middle"
            >
              <a-form-model-item
                label="所属公司"
                prop="plantName"
              >
                <a-input
                  v-model.trim="form.plantName"
                  placeholder="请输入所属公司名称"
                  style="width: 250px"
                />
              </a-form-model-item>

              <a-form-model-item
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                label="所属地区"
                prop="plantArea"
              >
                <a-cascader
                  v-model.trim="form.plantArea"
                  :options="areaOptions"
                  placeholder="请输入所属地区"
                  style="width: 250px"
                />
              </a-form-model-item>

              <!-- 按钮 -->
              <a-space>
                <a-button
                  type="primary"
                  html-type="submit"
                  :disabled="loading"
                  @click="fetch"
                >
                  查询
                </a-button>
                <a-button
                  :disabled="loading"
                  @click="resetForm"
                >
                  重置
                </a-button>
              </a-space>
            </a-row>
          </a-form-model>

          <a-list
            id="ProductList"
            class="trade-list"
            item-layout="horizontal"
            :loading="loading"
            :data-source="list"
            :pagination="pagination"
          >
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              class="item"
            >
              <a-list-item-meta>
                <ul
                  slot="description"
                  class="description"
                >
                  <li>公司名称：{{ item.plantName }}</li>
                  <li>注册时间：{{ item.createTime && $dayjs(item.createTime).format('YYYY-MM-DD') }}</li>
                  <li>所属地区：{{ item.plantArea && codeToText(item.plantArea) }}</li>
                </ul>
              </a-list-item-meta>
              <div class="actions">
                <ul class="infos text-right">
                  <!-- <li>实际配额总量：{{ item.actualQuota }} 吨(t)</li> -->
                  <li>可交易量：{{ item.tradeQuota }} 吨(t)</li>
                </ul>
                <div class="btns">
                  <a-button
                    class="buy-btn"
                    type="danger"
                    @click="
                      $router.push({
                        path: `/dating/detail/${item.id}`
                      })
                    "
                  >
                    查看详情
                  </a-button>
                </div>
              </div>
            </a-list-item>
          </a-list>
        </div>
      </a-col>
      <a-col
        style="margin-top: 65px"
        :span="7"
      >
        <a-card
          :head-style="getHeader"
          :body-style="getBody"
          class="clickCard"
          title="绿电积分认购入口 > > "
          @click="openGreen"
        >
          <img
            src="../../static/login/login.jpg"
            style="height: 203px;width: 100%"
            alt="banner2"
          >
        </a-card>
        <a-card
          :head-style="getHeader"
          :body-style="getBody"
          class="clickCard"
          title="绿色技术交易平台入口 > > "
          @click="openChange"
        >
          <img
            src="https://green.zjipx.com/LbFiles/tggw/76.jpg"
            style="height: 153px;width: 100%"
            alt="banner2"
          >
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { codeToText, ZJoptions } from '@/utils/cascader-address-options'
export default {
  data() {
    return {
      areaOptions: ZJoptions,
      codeToText,

      loading: false,
      list: [],
      form: {
        plantName: '',
        plantArea: []
      },
      pagination: {
        onChange: current => {
          this.pagination.current = current
          this.searchForm()
        },
        onShowSizeChange: (current, pageSize) => {
          this.pagination.current = current
          this.pagination.pageSize = pageSize
          this.searchForm()
        },
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'middle'
      }
    }
  },
  computed: {
    getHeader() {
      return { backgroundColor: 'rgba(85,184,181,0.86)', fontSize: '20px', color: 'white' }
    },
    getBody() {
      return { margin: '0', padding: '0' }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    searchForm() {
      this.loading = true
      this.$api.plant
        .getPlantAssets({
          // .findPlantChange({
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          plantName: this.form.plantName,
          plantArea: this.form.plantArea.join(',')
        })
        .then(res => {
          if (!res) res = { list: [], total: 0 }
          this.list = res.list
          this.pagination.total = res.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 查询
    fetch() {
      this.pagination.current = 1
      this.searchForm()
    },
    // 重置
    resetForm() {
      this.form.plantName = ''
      this.form.plantArea = []
      this.fetch()
    },
    openGreen() {
      window.open('http://121.5.150.148:8001/home')
    },
    openChange() {
      window.open('http://green.zjipx.com')
    }
  }
}
</script>

<style lang="less" scoped>
.c-home-index {
  .clickCard {
    margin-top: 45px;
    text-align: center;
    font-size: 16px;
  }
  .clickCard:hover {
    cursor: pointer;
  }

  .charts-warp {
    + .charts-warp {
      margin-top: 75px;
    }
  }
  .index-container {
    padding: 0 7.8%;
  }
  index-container2 {
  }
  .points-count {
    .num {
      height: 32px;
      line-height: 32px;
      margin: 60px auto 40px;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      letter-spacing: 8px;
      font-size: 36px;
      font-family: HelveticaNeue-BoldItalic, HelveticaNeue;
      font-weight: bold;
      font-style: italic;
      color: #56f560;
    }
  }
  .addup-count {
    /deep/.ant-tabs-tab {
      height: 56px;
      line-height: 56px;
      padding: 0;
      color: rgba(0, 0, 0, 0.65);
      font-size: 16px;
      &.ant-tabs-tab-active {
        color: #006f6c;
      }
    }
    /deep/.ant-tabs-ink-bar {
      background-color: #006f6c;
    }
    .tab-pane-item {
      margin-top: 150px;
    }
  }
  .trade-count {
    .bar {
      width: calc(100% - 146px);
    }
    .legends {
      width: 136px;
      .item {
        display: flex;
        height: 20px;
        line-height: 20px;
        margin-top: 16px;
        font-size: 12px;
        align-items: center;
        .rank {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 50%;
          background: #f0f2f5;
          text-align: center;
          &.no1 {
            background: #fa6400;
            color: #fff;
          }
          &.no2 {
            background: #f8c026;
            color: #fff;
          }
          &.no3 {
            background: #5891ff;
            color: #fff;
          }
        }
        .name {
          margin: 0 6px 0 16px;
          font-weight: 400;
          color: #000;
        }
        .num {
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          padding-left: 7px;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            width: 1px;
            height: 11px;
            top: 5px;
            left: 0;
            background: #d9d9d9;
          }
        }
      }
    }
  }

  .search-form {
    .form-row {
      margin-bottom: 22px;
    }
  }
  .trade-list {
    margin-top: 40px;
    .item {
      color: @text-color;
      &:first-child {
        border-top: 1px solid #e8e8e8;
      }
    }
    .pic-wrap {
      width: 140px;
      height: 122px;
      line-height: 122px;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    .description {
      line-height: 24px;
      list-style: none;
      color: @text-color;
      > li {
        min-height: 24px;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      .infos {
        padding-right: 20px;
        margin-right: 20px;
        list-style: none;
        position: relative;
        li + li {
          margin-top: 15px;
        }
        .price {
          color: #ff4d4f;
          .unit {
            font-size: 16px;
          }
        }
        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          border-right: 1px solid #e8e8e8;
        }
      }
      .btns {
        .buy-btn {
          width: 90px;
        }
      }
    }
  }
}
</style>
