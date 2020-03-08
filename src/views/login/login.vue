<template>
	<transition name="fade">
		<div class="login-list">
			<back-button 
				:isTransparent="false"
				:title="title"
				:isWhite="false"
				:click="back"
			/>
			<div v-if="step === 0" class="login-NumberBorder">
				<div class="login-phoneNumberAhead">+86</div>
				<input v-model="phoneNumber" placeholder="请输入手机号" type="number" class="login_phoneNumber" @input="getPhoneNumber">
			</div>
			<div v-else class="login-NumberBorder">
				<input v-model="password" placeholder="请输入密码" type="text" class="login_phoneNumber" @input="getPassWord" style="width: 100%; padding-left: 0px;">
			</div>
			<div class="nextStep-button" @click="nextStepClick">下一步</div>
		</div>
	</transition>
</template>
<script>
import backButton from "../../components/back-button";
import { loginRequest } from "../../store/api.js";
export default {
	name: "login",
	components: {
		backButton
	},
	mounted() {	
		// loginRequest.getStatus()
		// 	.then(res=> {
		// 		console.log(res)
		// 	})
	},
    data() {
        return {
			step: 0,
			phoneNumber: Number,
			password: '',
			title: "手机号登录"
        }
    },
    methods: {
		back() {
			if (this.step === 1) {
				this.step = 0;
			}
		},
		nextStepClick() {
			if (this.step === 0) {
				if (this.phoneNumber.length === 11) {
					this.step = 1;
				} else {
					console.log('请输入完整的手机号');
				}
			} else {
				if (this.password.length === 0) {
					console.log('请输入密码');
				} else {
					loginRequest.goLogin({
						phoneNumber: this.phoneNumber.toString(),
						password: this.password
					}).then(res => {
						this.$router.replace({name: this.$route.params.push});
					})
				}
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