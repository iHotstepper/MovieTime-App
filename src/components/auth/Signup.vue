<template>
<v-container class="black rounded-lg"> 
    <v-row justify="center" align="center">
        <v-col align="center">
            <h1>Signup</h1>
            <v-form 
                style="width: 280px;"
                v-model="valid"
                class="mt-8"
                @submit.prevent="signup"
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
                <v-text-field
                    v-model="nickname"
                    :counter="10"
                    label="Nickname"
                    :rules="[v => !!v || 'Nickname is required']"
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
import db from '@/firebase/init'
import firebase from 'firebase'

export default {

    name: 'Signup',
    data() {
        return {
            email: null,
            password: null,
            nickname: null,
            feedback: null,
            valid: true
        }
    },
    methods: {
        signup() {
            if(this.nickname && this.email && this.password){
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    let ref = db.collection('users').doc(cred.user.uid)
                    let watchlist = db.collection('watchlist').doc(cred.user.uid)
                    ref.get().then(doc => {
                    if(doc.exists) {
                        this.feedback = "This nickname already exists"
                    }   else {
                        ref.set({ nickname: this.nickname, user_id: cred.user.uid  })
                        watchlist.set({ exists: true })
                        this.$router.push({ path: '/' })
                    }
                        this.$emit('closedialog')
                    })
                }).catch(err => { this.feedback = err.message })
        }
             }
        }
    }
</script>

<style>
.signup{
    max-width: 400px;
    margin-top: 60px;
}
.signup h2{
    font-size: 2.4em;
}
.signup .field{
    margin-bottom: 16px;
}
</style>