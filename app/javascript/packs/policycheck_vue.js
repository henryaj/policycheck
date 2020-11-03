/* eslint no-console: 0 */

import Vue from 'vue/dist/vue.esm'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import axios from 'axios'

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './user.scss'

document.addEventListener('DOMContentLoaded', () => {
  // let postcodeURL = 'https://api.getAddress.io/find/'
  let postcodeURL = 'localhost:9999/getaddress/'
  let licencingURL = 'localhost:9999/kamma'

  const app = new Vue({
    el: '#main',
    data: function () {
      return {
        showAddressForm: false,
        form: {
          postcode: null,
          addressLine1: null,
          addressLine2: null,
          addressLine3: null,
          addressLine4: null,
          city: null,
          country: null,
        },
        licenceDetails: null,
      }
    },
    methods: {
      getAddress: function(event) {
        event.preventDefault()
        this.showAddressForm = true

        let postcode = this.form.postcode

        axios.get(postcodeURL + postcode.trim())
          .then((resp) => {
            console.log(resp)
            // date options in form
            // on select, populate data to fill form below
          })
          .catch((resp) => console.log(resp))
      },
      checkLicence: function(event) {
        event.preventDefault()

        let payload = {
          'property_id': 'foo',
          'address_1': this.form.addressLine1,
          'postcode': this.form.postcode,
        }

        if (this.form.addressLine2 != null) {
          payload['address_2'] = this.form.addressLine2
        }
        if (this.form.addressLine3 != null) {
          payload['address_2'] = this.form.addressLine3
        }
        if (this.form.addressLine4 != null) {
          payload['address_2'] = this.form.addressLine4
        }


        axios.post(licencingURL, payload)
          .then((resp) => console.log(resp))
          .catch((resp) => console.log(resp))
      }
    }
  })
})

