<template>
  <div>
    <div class="register">
      <el-container>
        <el-header
          ><h3>
            注册新用户
            <span class="go"
              >我有账号，去
              <router-link to="/login" target="_blank">登陆</router-link>
            </span>
          </h3></el-header
        >
        <el-main>
          <el-form
            :model="userInfo"
            status-icon
            :rules="rules"
            ref="userInfo"
            label-width="500px"
            class="demo-userInfo"
          >
            <el-form-item label="手机号" prop="phone">
              <el-col :span="9">
                <el-input
                  type="text"
                  v-model="userInfo.phone"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-col :span="9">
                <el-input
                  type="password"
                  v-model="userInfo.pass"
                  autocomplete="off"
                  show-password
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-col :span="9">
                <el-input
                  type="password"
                  v-model="userInfo.checkPass"
                  autocomplete="off"
                  show-password
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-col :span="9">
                <el-input
                  type="text"
                  v-model="userInfo.code"
                  autocomplete="off"
                ></el-input>
              </el-col>
              <el-col :span="3"
                ><el-button
                  icon="el-icon-s-comment"
                  :disabled="isDisabled"
                  @click="changeDisabled($event)"
                  >获取验证码</el-button
                ></el-col
              >
            </el-form-item>
            <el-form-item prop="agree">
              <el-checkbox
                label="同意协议并注册《尚品汇用户协议》"
                v-model="userInfo.agree"
              ></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-col :span="6"
                ><el-button type="primary" @click="submitForm('userInfo')"
                  >完成注册</el-button
                ></el-col
              >
              <el-col :span="3"
                ><el-button @click="resetForm('userInfo')"
                  >重置</el-button
                ></el-col
              >
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userInfo.checkPass !== "") {
          this.$refs.userInfo.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validateCheck = (rule, value, callback) => {
      if (value === false) {
        callback(new Error("请勾选协议"));
      } else {
        callback();
      }
    };
    return {
      isDisabled: false,
      time: 10,
      userInfo: {
        pass: "",
        checkPass: "",
        phone: "",
        code: "",
        agree: true,
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "长度为6个字符", trigger: "blur" },
        ],
        agree: [{ validator: validateCheck, trigger: "change" }],
      },
    };
  },
  methods: {
    async changeDisabled(event) {
      try {
        const { phone } = this.userInfo;
        if (phone) {
          this.isDisabled = !this.isDisabled;
          await this.$store.dispatch("getCode", phone);
          this.userInfo.code = this.$store.state.user.code;
          let timerId = setInterval(() => {
            if (this.time === 0) {
              clearInterval(timerId);
              this.isDisabled = false;
              this.time = 10;
              event.target.innerHTML = "获取验证码";
            } else {
              event.target.innerHTML = `${this.time}秒后重新获取`;
              this.time = this.time - 1;
            }
          }, 1000);
        } else {
          alert("电话号码不能为空");
        }
      } catch (error) {
        alert(error.message);
      }
    },
    async userRigister() {
      try {
        const { phone, code, pass } = this.userInfo;
        let password = pass;
        let result = await this.$store.dispatch("userRigster", {
          phone,
          code,
          password,
        });
        if (result) {
          this.$router.push({ name: "login" });
        }
      } catch (error) {
        alert(error.message);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userRigister();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
body {
  box-sizing: border-box;
}
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;
  h3 {
    background: #ececec;
    margin: 0;
    color: #333;
    font-size: 20px;
    line-height: 60px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }
}
.el-header {
  background: #ececec;
  border-bottom: 1px solid #dfdfdf;
  color: #333;
  line-height: 60px;
}
.el-main {
  color: #333;
  //   text-align: center;
  //   margin: 100px auto;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
.copyright {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  line-height: 24px;

  ul {
    li {
      display: inline-block;
      border-right: 1px solid #e4e4e4;
      padding: 0 20px;
      margin: 15px 0;
    }
  }
}
</style>