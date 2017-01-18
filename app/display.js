import React from 'react'

const isObjectEmpty = (obj) => {
	let flag = true
	for (let i in obj) {
		const temp = "" + obj[i]
		if (temp !== "undefined")
			flag = false
	}
	return flag
}

 const  getFromBetween = {
    results:[],
    string:"",
    getFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        const SP = this.string.indexOf(sub1)+sub1.length;
        const string1 = this.string.substr(0,SP);
        const string2 = this.string.substr(SP);
        const TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP,TP);
    },
    removeFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        const removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
        this.string = this.string.replace(removal,"");
    },
    getAllResults:function (sub1,sub2) {
        // first check to see if we do have both substrings
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        const result = this.getFromBetween(sub1,sub2);
        // push it to the results array
        this.results.push(result);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1,sub2);

        // if there's more substrings
        if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1,sub2);
        }
        else return;
    },
    get:function (string,sub1,sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1,sub2);
        return this.results;
    }
}

const replaceWithEmoji = (str) => {
	let emojified  = str
	const arr = getFromBetween.get(str, ":", ":")
	emojified = emojified.replace(/:/g,'')
	for (let i = 0; i < arr.length; i++) {
		const s = arr[i]
		const e = `<i class="em em-${s}"></i>`
		emojified = emojified.replace(s,e)
	}
	return emojified
}

const DisplayGithubProfile = (props) => {
	if (!props.loading && props.username === '') {
		return (
			<h3 className="dumbfuck">
				Dumbfuck enter the Github Username
			</h3>
		)
	}
	else if (props.loading) {
			return (
					<div className="spinner">
					  <div className="bounce1"></div>
					  <div className="bounce2"></div>
					  <div className="bounce3"></div>
					</div>
				)
		}
		else if(isObjectEmpty(props.user)) {
			return (
					<h3 className="dumbfuck">
						No Such Github User
					</h3>
				)
		}
		else {
			const style = {
				box: {
					textAlign: "center",
					margin: "2em"
				},
				flex: {
					display: "flex"
				},
				flex_children: {
					flex: 1,
					padding: "2em",
					border: '2px double #123456'
				}
			}
			const {
					avatar_url,
					bio,
					public_repos,
					public_gists,
					followers,
					following,
					blog,
					location
				} = props.user
			return (
					<div style={style.box}>
						<a href={`https://github.com/${props.username}`} target="_blank" >
							<img src={avatar_url} width="300px" height="300px" alt="Avatar"/>
						</a>
						<h2>{location}</h2>
						{bio && <h3 dangerouslySetInnerHTML={{__html: replaceWithEmoji(bio)}}></h3>}
						<div style={style.flex}>
							<div style={style.flex_children}>{following} Following</div>
							<div style={style.flex_children}>{followers} Followers</div>
							<div style={style.flex_children}>{public_repos} Repos</div>
							<div style={style.flex_children}>{public_gists} Gists</div>
						</div>
					</div>
				)
		}
}

export default DisplayGithubProfile
