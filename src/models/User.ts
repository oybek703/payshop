import { model, models, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Please enter your full name!'
    },
    email: {
      type: String,
      required: 'Please enter your email address!',
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: 'Please enter password!'
    },
    role: {
      type: String,
      default: 'User'
    },
    image: {
      type: String,
      default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEVpw6P///9lwqGX071gwJ5dv536/fzs9/OM0Lez38/I6NxwxqeIzrWT0rvk9O6FzbN3yKu949We18Le8ep2yKrG59qm2sfQ6+Hh8uy/5NZ+yq/Z7+ek2cbr9/Ly+vev3cx2A4qyAAALjElEQVR4nOVd67qiOgzF2iKIgOLdvdX3f8tTQBTl1rQrbJyzfs43M7CkTdJkJfVm/zo8/kf4t+v2eA4P2TwOgjRNgyCeZ4fwfNwubj7/41kZ+skxnKc7TyoppXiH/hMlvV06D48JK082hsk+W3siJ+b1IacqvHW2P3G9CAdDfxsG+gP1U/sgqv9+EG45Piac4eIcRzR2NZZefL6iXwjLMAkvwordi6W4hAn0nYAMF+HO7uN9kpRRuMC9Foqhv1xp04iCVOketScxDE8HD/D16hAyyjDmFcHwZwWmV5FMfwBv58zQX64VB7+Co4rcF6sjQ38TKSZ6JWS0ceToxnAT4awLF0cXhssR+JUc93/C8HThXZ91qLW9zbFluJiz2M8uCBXbhnOWDMOBIwMDRxGOyHC7HmcDvkPutiMx9A9sDnAA6tfCqtIZ/vzJBywhd3SLQ2Z4H9XCfELIOzPDxeXvPmAJuSaerGgMl6Ob0CaEoPl/EsPDX3/AEvKXiaGfToOgpni5cTDcen+/QisIz9w1GjNcTodfDvPNaMowHC/MNoMyDeIMGWZTI6gpZkiG8VRsTB0yxjEMpkhQU1yBGE7HS3xCpgaR+DBD/zItK1qHuAxTHGQ4ZYJGFAcZplMmqCmmrgxXU92DFWTgxnCSbuIdQ06jn+Hv9Alqiv2uv5fh5EK1dvQHcH0Ml99BUFNc2jHcTtuK1iF6DlPdDG9//dokdB+JuxlO2tN/QlzoDL/CjL7QnbvpYrj8LoKaYpe16WC4+KYlWkJ05FE7GH7VJiwh1hSG929bozk6Ev6tDH++kaCm2Fq2aWPo775vjeYQ67bDYhvDL3MUL8iDGcPTt4SjTaiW6K2F4Zeu0Rxt9rTJ8CvtaAXZPEg1GH6hr6+j6fcbDOdsMjwhlfKiXeQpNaRvd3jKfIghkyvU7C73ZeKXSJb3FCEnboP8NDafDFnCNSni46er8o+x4Pg1G8bmg+GewVPI6N4eFN9CDunfZ0rjg2EEf6BQ9+7zt79h2JBRH8MN/DeVab845BbDV43cdDP04Z+wxT99Aq9gid72/BtD9CcUnolI64oOot4/Yp0h+hOKyEy+dEMb8LePWGe4x35CsTNVvaAreG85mzrDHfQxfTnMBsU1luKuneEP1qpJSssLOP2savu/xnAF/R3VmUAQ/fOKmobhxfAE3YXNCHgA2ENbbQG9GP5itwJBW1dijXy6eKXAnwx95AM8SVujOY7QdfpyGE+GWFcRtbPoBdRlvBzGkyFUc9FbsuwC1Ni8bE3FcAFdIzurXizoR1RVPFUxDJGLlC6oLwANi58xf8UQGpIKu25sbBKsMgUPhgny5+spyPYDagtk8sYQukhFW3LdBFCvXy3TB0OspT5aMoQm+qqVVDK8QneAsG0VxG7Ex2uUDM/Yk6ElQf02SDziqvJtYuiP11FuNgA2No1fDLHpC2Ekv25FgPUX/pPhFns4M9PQtwG7lspqYsEQ6ivoR8MXsGWh0l94+MXhwBD7DUXwZAjOsdmvUuxP7cmKYYJNQVkHbTrwgL6Ip5IHQ3Ce1Or4WwL7Hp7cPxhm4JSzsJ3UcUO/SPZgCPWzXksZ1hTwAvS6ZIjNQXlWaagSWK+Vwy8YJujqlrUxxeakvfIorhke4b9cZLcR8cry/BzncawNywMi2qaXUY3HoaCxXKb4JrI8vPJYutOkzcw8BsVg3tnmzXx02dB7OCIqwCFbgbWvGbJ0jij6R8Qe4SrcNMMrizKJvhNZ1Fjiqhny/HZkc4qX8uTQh2CPwR2WoBUQ4WFHCf1De+g8W4XhBt060FKFCjqA9Bgc/uM/p9hTeLxWvUSoGR64xKytyvl2zLmU1+KgGaJPhy8YF9kyNmm5dswen+zZdKH6jGM3dNjmgfNb7zAZd3RlMjIFtF/2WIKl1xPEUEX/zDr/TQSaIZcZe0AFfQXhbcrboCNW/Az1Z8y6OJ5i7gF+BUP+0R5CrhpS/XzE8oV/QKGOO/i/YfEgKeJz8rzNwr+dNoEcYwDjKKu0epZU3iWYZ7/ZPLh4XP0kjaeuuG3p5wNLjPjAgNkf/jkKf8gY0/w9ipiGLy6dAIq4lO1sMQUUZwuu82HhI4bb04TY7dBXR7xQnA+5zvhSzI/XZBMN3BW02vqzxTllGi9dnPFZ8jRCpfvyWHHr7fkR1aSu5M7SjVjkaRhybULEr1C0X5tbC+P2a/xiLXJt8HypEIe3fHBP1+ZHLfUInzRd5EvBOW8hs0/hXmeSotm7t9+BOd7gdQuVNoWJXXM22hKO/h1qc4q6BfL4JKLWI32HAlm0pjgWwGGiZe0JGLaprKP4u2nbiqor8Y9rDs5rYMAasOgc1dRaOetJxCWoywkeNWCQQ+zNqzX1nf3KKdBEykcdH1MUkf16vYZUZqBjAbOwHloMiJ5mcLz2xysPtidixqn5ME2UQT/lm8kWQ3NV9VcHLK2HJgpwQuyxMU+8RRYmihv3yZRPXZuzjqXT7r+hZtHap3J9wlnm9tQmuupLTXvxntdjmBalXJsun/pSR42w8Qz/SoxgXh5ujRTM8dQIuyUUCTeG3MqfUpqX+J0qizWdt4vzIdXri7m9Zrv2AZfSW02r73IIbg+fu6C/Ce2WmKvDq6nTk6FDzwzpg+SaC9k6+q8bDjqbWs+Mfd6bLGBLJLWxzbquUu97csi3kQcLkDv3TrYM5b7G0Lb/0FrRTYFtyPUYTufWQ2rfh0fAzW6BvfeQWvoLhbivdxh2dYePPmCrXm6H9h8S7D6ieu/lturHJ3oKe1jtxGrOkMtMhVF2YQ6b0TmNmQoWczEMZrGhYGEIG3MxLLKmXSPCGUBfYc3ZJvS8CE0i6wZ6sqxlPg05Nh3F21cgVx5aZgyR50RZNBzYg2pN2+ZE0Q3WiATJe0i+srHW89qs2mKsQTwmts9rI85pGnUbzmY0hh0z92jbuW38OSNoWet6LGI9+1LatjPbgXRG75x9SQpOLftEbUE6X7y1y9vOoB3T3xNfrWcGLcXrG5RWoKDkWXrmCBN+KYfhF1YgOMS+WdCEnTj2KiVYwd553oSZ7LRMsDPMbenATHbzLPq4MY15NDI0V5/wX6nf8b7i0dxXNCKRRvxsvhyEF8xHQUyQgjUtYIMhJTksRoL5G5ncUcKoGR4BJvfMuJXs/hhmdwUxta+PAsP7nl6Kgm+D6Z1dbK3j3BCt44v/n3fnfem9XZT7D/8Hd1h+491kxHtI//27ZL/OZXSPqOjOXPN3QAPRcyD/P9/L/e/frf7Q2X0DegWuvRUkR3nnWFCbPhL9NbKvuDd3YEbMQBUQ1NnBCTmQuR2qczJOx8FADiXfByu5E3eLw5npQYboW9+wEJfBEthwNX7KFA0IGjCc+cCWRyxkalDENFJUTNTcSKNLGMw0I5N0GkNugsRwlk0vulGGpSFT3c/kAjjjXiRjZdNyWhZV7E1f3Fy7tfWmw1F45moegjptOl5DpoTSJUl/N5HcDa1ziqYwxN8wTcfwKEYXhrMFfPoIFXJN1LWSVaL3kWbJtUPQr1ak62C36AErBMg1vUvHQunrH5iGOg1BqF8LuaCVlvmEmsxBgtxZSVot1drh6EZVCMsGFls9+iIb1eIIObdtDbBX3G8v4wXjysLCuDPU/j8aZzvKyDjMBjPUZ6oROMrIrSvAsS/EP0e8a1VGG0dBuXvny3LN5h6F2rmsTxTD2exnxWJXhUwRfcaY7qXkEIFJChllJ8i7ofqz/OVK4ayOVKs9qp8D2IG22OwQM7qFlFEI7PzD9thdw4twIqn/9SW0u5m9C/Auwus+juzmkeczzeO97Y3XneDok/S3YSBpLDU7GYQnjl4qtk7QZJ+t8z01cAgRxV9ZZ3uM4WwBa6+rnxzDeaqJKpnzeIP+Ex0prNN5eExY2+BG6Ob1b9ft8RwesnkcBKt0FQTxPDuE5+P2ehuhxW/UfuU/wX/w55I2MABtjgAAAABJRU5ErkJggg=='
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    defaultPaymentMethod: {
      type: String,
      default: ''
    },
    address: [
      {
        firstName: String,
        lastName: String,
        phoneNumber: String,
        address1: String,
        address2: String,
        city: String,
        zipCode: String,
        state: String,
        country: String,
        active: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  { timestamps: true }
)

const User = models.User || model('User', userSchema)

export default User
