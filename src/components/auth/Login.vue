<template>
<v-container class="black rounded-lg"> 
    <v-row justify="center" align="center">
        <v-col align="center">
            <h1>Login</h1>
            <v-form 
                style="width: 280px;"
                v-model="valid"
                class="mt-8"
                @submit.prevent="login"
                >
                <br>   
                <v-text-field
                    v-model="email"
                    label="Email"
                    :rules="[v => !!v || 'Email is required']"
                    required
                    outlined
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    type="password"
                    label="Password"
                    :rules="[v => !!v || 'Password is required']"
                    required
                    outlined
                ></v-text-field>
                <br>   
                <p class="red-text center" v-if="feedback">{{ feedback }}</p>
                <v-btn
                    :disabled="!valid"
                    color="#E040FB"
                    large
                    class="white--text"
                    type="submit"
                    style="width: 160px"
                > Confirm </v-btn>
                <br>   
                <br>   
            </v-form>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import firebase from 'firebase'

export default {
    data() {
        return {
            email:  null,
            password: null,
            feedback: null,
            valid: true
        }
    },
    methods: {
        login() {
            if(this.email && this.password){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    this.$router.push({ path: '/' }).catch(()=>{});
                    return cred
                }).catch(err => {
                    this.feedback = err.message
                })
                this.feedback = null
                this.$emit('closedialog')
            } else {
                this.feedback = 'Please fill in both fields'
            }
        }
    }
}
</script>

<style>
.login{
    max-width: 400px;
    margin-top: 60px;
}
.login h2{
    font-size: 2.4em;
}
.login .field{
    margin-bottom: 16px;
}
</style>