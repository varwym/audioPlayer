<template>
    <div class="login_list">
        <div class="navigation_back">
            <h2>手机号登录</h2>
        </div>
		<div v-if="step === 0" class="login_NumberBorder">
			<div class="login_phoneNumberAhead">+86</div>
			<input v-model="phoneNumber" placeholder="请输入手机号" type="number" class="login_phoneNumber" @input="getPhoneNumber">
		</div>
		<div v-else class="login_NumberBorder">
			<div class="login_phoneNumberAhead">+86</div>
			<input v-model="password" placeholder="请输入密码" type="text" class="login_phoneNumber" @input="getPassWord">
		</div>
		
        <div class="nextStep_button" @click="nextStepClick">下一步</div>
    </div>
</template>
<script>
export default {
    name: "login",
    data() {
        return {
			step: 0,
			phoneNumber: Number,
			password: ''
        }
    },
    methods: {
		nextStepClick() {
			if (this.phoneNumber.length === 11) {
				this.step = 1;
			} else {
				console.log('请输入完整的手机号')
			}
		},
		getPhoneNumber() {
			if (this.phoneNumber.length > 11) {
				this.phoneNumber = parseInt(this.phoneNumber.toString().slice(0, 11));
			}
		},
		getPassWord() {
			if (this.password.length > 20) {
				this.password = parseInt(this.password.toString().slice(0, 20));
			}
		}
	}
}
</script>
<style lang="less" scoped>
@import "../../styles/login/login.less";
</style>