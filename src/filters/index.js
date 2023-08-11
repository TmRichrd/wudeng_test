import Vue from 'vue'
import * as utils from '@/utils/mUtils'
Vue.filter('formatTime', utils.formatDate)
