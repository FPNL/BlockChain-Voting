import axios from './axios';

async function getPrivateKey() {
	const result = await axios.get('api/get-private-key');

	return result.data.ret.txn_hash;
	// {
	// 	result: 'ok',
	// 	ret:{
	// 		rsa_private_key: pk,
	// 	}
	// }
}

async function getPublicKey() {
	const result = await axios.get('api/get-public-key')
	return result.data.ret.rsa_public_key;
	// {
	// 	result: 'ok',
	// 	ret: {
	// 		rsa_public_key: pk,
	// 	}
	// }
}

async function getTicketByAddress(address) {
	const result = await axios.post('api/give-vote', {
		to_address: address
	});

	return result.data.ret.txn_hash;
	// {
	// 	result: "ok",
	// 	ret:{
	// 		"txn_hash":"0xa6a1e7a91d6448199bf0979344cfd2e89d9e9ec9b9c027c368fd29f24d466e20"
	// 	}
	// }
}

async function uploadPrivateKey() {
	const result = await axios.post('api/upload-private-key');

	return result.data.result;
}

export { getTicketByAddress, getPrivateKey, getPublicKey ,uploadPrivateKey};
