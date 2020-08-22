# Project Title

One Wallet. App to manage and track wallet where multiple persons are contributing.

## Layers

- Entities
- UseCases
- EventsReaction 
- Adapter


## Use Cases  
- [x] Register User, Refactor
- [x] Send Otp to User
- [x] Verify User by Otp
- [x] Login User
- [ ] Forget Password
- [ ] Reset Password
- [ ] User create a wallet become admin.
- [ ] Admin invite other users to be contributors.
- [ ] User Accept invitation.
- [ ] User Deposit to wallet.
- [ ] Admin Confirm a deposit.
- [ ] Admin reject a deposit.
- [ ] Contributors track view wallet balance and transactions.
- [ ] Contributor request a loan.
- [ ] Contributors accept loan request.
- [ ] Contributor confirm receiving the loan.


## Getting Started

Install deno:  
[deno](https://deno.land/)

Upgrade: 
```deno upgrade --version 1.3.0```

## Testing

```deno test```


### Executing program

run Oak server:
```deno run --allow-net --unstable src/Frameworks/Web/oak/main.ts```

run Abc server:
```deno run --allow-net --unstable src/Frameworks/Web/abc/main.ts```

## Authors

*  [bander](bannadr1@hotmail.com)

## License

No License at the moment. Refer to (No License)[https://choosealicense.com/no-permission/] to know what means.
