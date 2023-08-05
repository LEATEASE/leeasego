import Mock from 'mockjs'
import banners from './banners.json'
import floor from './floor.json'
import text from './text.json'

Mock.mock("/mock/banners",{code:200,data:banners})
Mock.mock("/mock/floor",{code:200,data:floor})
Mock.mock("/mock/text",{code:200,data:text})