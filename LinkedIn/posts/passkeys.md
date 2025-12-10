Online services are pushing passkeys. Is it really the safer option?

Recently a number of service providers I use started pushing passkey authentications over traditional passwords. Which led me on a tangent...

What is a passkey? It's just a public/private key pair, with the private key playing the role of your "password".

Pros:
* the private key is very long and cryptographically random, making it very hard to guess

Cons:
* the private key is very long and cryptographically random, making it impossible to remember
* the private key is thus linked to your device, which creates a host of other issues:
* your passkey is only as safe as the login security to your device. Fingerprint, voice or face unlock are not a meaningful security. Neither is a "1234" pincode.
* if your device is lost, you're effectivelly locked out of your account
* if your sevice allows for password auth as a secondary login method, then your security is only as strong as your password to begin with, so why not just stick with the password?
* if you use an online backup service to your key, that's a whole new world of security issues with that online backup itself being a treasure trove for hackers

So the passkeys are all about downsides, and the only upside can easily be mitigated by creating a strong password.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EDITORIAL FOR LINKEDIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 Are passkeys really safer?

Everyone's pushing passkeys as the future of authentication. Is it really the safer option for the average user?

A passkey = public/private key pair. The private key is essentially your "password".

Here's my problem:

The point of a password is to be a SECRET that only you can know, and use it to verify your identity. But if you can't memorize the password, then it only verifies the identity of the device where it is stored, rather than yours.

Cloud sync? Sure, you won't lose access when you lose your device, but now you've created a high-value target for attackers.

So is "password1234" for rarely used service really any worse than a device protected by "1234" pin with a dozen of passkeys on it?

What am I missing here?