function userName() {
    $.ajax({
        type: "GET",
        url: `/api/users/me`,
        data: {},
        headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        success: function(response) {
            // console.log(response)
            let name = response["user"]["nickname"]
            // console.log(name)

            let temp_html = `<p>
                                ${name} 님 안녕하세요!
                            </p>`
            $('#name').append(temp_html)

        },
        error: function(error) {

        }
    })
}

function join() {
    window.location.href = '/join'
}

function login() {
    window.location.href = '/login'
}

function logout() {
    localStorage.clear();
    window.location.href = "/";
}