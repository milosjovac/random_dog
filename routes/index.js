const fetch = require('node-fetch')

export default function routes (app, addon) {
  // Redirect root path to /atlassian-connect.json,
  // which will be served by atlassian-connect-express.
  app.get('/', (req, res) => {
    res.redirect('/atlassian-connect.json')
  })

  app.get('/dog', addon.authenticate(), async (req, res) => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    if (!response.ok) {
      const textContent = response.text()
      console.log(`error while getting random dog picture: ${textContent}`)
    }

    const title = 'Random dog'
    const jsonContent = await response.json()
    const imageUrl = jsonContent.message
    res.render('dog', { title, imageUrl })
  })

  // This is an example route used by "generalPages" module (see atlassian-connect.json).
  // Verify that the incoming request is authenticated with Atlassian Connect.
  app.get('/hello-world', addon.authenticate(), (req, res) => {
    // Rendering a template is easy; the render method takes two params:
    // name of template and a json object to pass the context in.
    res.render('hello-world', {
      title: 'Atlassian Connect'
      // issueId: req.query['issueId']
    })
  })

  // Add additional route handlers here...
}
