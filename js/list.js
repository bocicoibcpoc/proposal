window.onload = () => {

    if (sessionStorage.private_key) {
        
        const providers = ethers.providers;
        const network = providers.networks.ropsten;
        const infuraProvider = new providers.InfuraProvider(network, "bc9ad02aefe8432da4a8111b092a2732");
    
        const address = "0xf54d8615ce2d69056f701acb73caf05afe31b73e";
        const abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"status","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"},{"name":"_content","type":"string"}],"name":"create","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_content","type":"string"}],"name":"disapprove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"partyOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_content","type":"string"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getProposalsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_party","type":"uint256"},{"name":"_username","type":"string"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"usernames","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];
    
        const wallet = new ethers.Wallet(sessionStorage.private_key, infuraProvider);
        const contract = new ethers.Contract(address, abi, wallet);

        contract.usernames(wallet.address)
        .then( (res) => {
            document.getElementById("username").innerHTML = '<b>' + res.toString() + '</b>';
        });

        document.getElementById("your_address").innerHTML = wallet.address;

        contract.balanceOf(wallet.address)
        .then( (res) => {
            document.getElementById("your_balance").innerHTML = "Your banlance : " + res.toString();
        });

        contract.partyOf(wallet.address)
        .then( (res) => {
            const party = res.toString();
            if (party == "1") {
                document.getElementById("create").innerHTML = '<a href="create.html" class="button">Create Proposal</a>';
            }

            if (party == "1") {
                document.getElementById("your_party").innerHTML = "Your party : <b>A</b>";
            }

            if (party == "2") {
                document.getElementById("your_party").innerHTML = "Your party : <b>B</b>";
            }

            if (party == "3") {
                document.getElementById("your_party").innerHTML = "Your party : <b>C</b>";
            }

            contract.getProposalsCount()
            .then( (result) => {
                document.getElementById("table").innerHTML = "";
                for (var i=0; i < parseInt(result.toString()); i++){
                    const id = i;
                    contract.proposals(id)
                    .then( (result) => {
                        var proposal = result.toString().split(",");
                        var action = "";
                        if (party == "1" && proposal[2] == "0") {
                            action = `
                            <a href="approve.html?id=${id}">
                                <i title="Approve" class="fas fa-check"></i>
                            </a>`;
                        }
    
                        if (party == "2" && proposal[2] == "1") {
                            action = `
                            <a href="approve.html?id=${id}">
                                <i title="Approve" class="fas fa-check"></i>
                            </a>
                            <a href="disapprove.html?id=${id}">
                                <i title="Disapprove" class="fas fa-times"></i>
                            </a>`;
                        }
    
                        if (party == "3" && (proposal[2] == "2" || proposal[2] == "3")) {
                            action = `
                            <a href="approve.html?id=${id}">
                                <i title="Approve" class="fas fa-check"></i>
                            </a>
                            <a href="disapprove.html?id=${id}">
                                <i title="Disapprove" class="fas fa-times"></i>
                            </a>
                            `;
                        }
                        
                        if (proposal[2] == "4") {
                            action = `Confirmed`;
                        }
    
                        if (action == "") {
                            action = `Pending to approve`;
                        }
    
                        document.getElementById("table").innerHTML += `
                            <tr>
                                <td>${id}</td>
                                <td>${proposal[0]}</td>
                                <td>
                                    ${action}
                                </td>
                            </tr>
                        `;
                    });
                }
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