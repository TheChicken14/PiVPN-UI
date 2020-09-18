async function promis() {
    return new Promise(r => setTimeout(() => r(), 5000))
}

function deleteConfig(id) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to connect using this client!",
        icon: "warning",
        buttons:
        {
            cancel: {
                text: "Cancel",
                visible: true
            },
            confirm: {
                text: "OK",
                value: true,
                closeModal: false,
            }
        },
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                fetch(`/api/configs/${id}/delete`)
                    .then(() => {
                        swal("Your client is deleted!", {
                            icon: "success",
                        })
                            .then(() => window.location.reload())
                    })
            }
        });
}

function createConfig() {
    swal({
        text: 'Enter the client name.',
        content: "input",
        button: {
            text: "Create!",
            closeModal: false,
        },
    }).then(name => {
        if (!name) return;

        fetch(`/api/configs/create/${name.trim().replace(/\s+/g, "-")}`)
            .then((res) => {
                if (res.ok) {
                    swal("Your client is created!", {
                        icon: "success",
                    }).then(() => window.location.reload())
                }
            })
    })
}