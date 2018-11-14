window.onload = () => {
    if (sessionStorage.private_key) {
        
        const providers = ethers.providers;
        const network = providers.networks.ropsten;
        const infuraProvider = new providers.InfuraProvider(network, "bc9ad02aefe8432da4a8111b092a2732");
    
        const address = "0xf54d8615ce2d69056f701acb73caf05afe31b73e";
        const abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"status","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"},{"name":"_content","type":"string"}],"name":"create","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_content","type":"string"}],"name":"disapprove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"partyOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_content","type":"string"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getProposalsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_party","type":"uint256"},{"name":"_username","type":"string"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"usernames","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];
    
        const wallet = new ethers.Wallet(sessionStorage.private_key, infuraProvider);
        const contract = new ethers.Contract(address, abi, wallet);

        let id = window.location.href.split("=")[1];

        contract.proposals(id)
        .then( (result) => {
            var person = result.toString().split(",");
            document.getElementById("title").value = person[0];
            document.getElementById("content").value = person[1];
        });

        document.getElementById("submit").addEventListener("click", () => {
            let content = document.getElementById("content").value;
    
            contract.approve(id, content)
            .then(function(transactionHash) {
                document.getElementById("fields").innerHTML = '<i class="fas fa-clock"></i> Please Wait...';
                var action = setInterval(() => {
                    infuraProvider.getTransactionReceipt(transactionHash.hash)
                    .then((transaction) => {
                        if (transaction != null && transaction.status == 1) {
                            clearInterval(action);
                            window.location.replace("list.html");
                        } 
                        else if (transaction != null && transaction.status == 0) {
                            document.getElementById("message").innerHTML = '<i class="fas fa-info-circle"></i> Please Try Again.';
                        }
                    });
                }, 3000);
            });
        });
        
        document.getElementById("logout").addEventListener("click", () => {
            sessionStorage.clear();
            window.location.replace("list.html");
        });
        
    } else {
        window.location.replace("index.html");
    }
}