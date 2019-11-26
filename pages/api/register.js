import ow from 'ow'

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export default (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).send('Not Found')
    return
  }

  const { body } = req

  try {
    ow(
      body,
      ow.object.exactShape({
        org: ow.object
          .exactShape({
            hasJoined: ow.boolean,
            name: ow.string.nonEmpty.maxLength(40),
            description: ow.string.nonEmpty.maxLength(200),
            email: ow.string.matches(EMAIL_REGEX),
            category: ow.string.oneOf([
              'circle',
              'community_general',
              'media',
              'community_regional',
              'community_academic',
              'business',
              'virtual_idol'
            ]),
            location: ow.string.maxLength(20),
            facebook: ow.optional.string.maxLength(100),
            twitter: ow.optional.string.maxLength(100),
            instagram: ow.optional.string.maxLength(100),
            youtube: ow.optional.string.maxLength(100),
            website: ow.optional.string.url
          })
          .hasAnyKeys('facebook', 'twitter', 'instagram', 'youtube'),
        mascot: ow.object.exactShape({
          name: ow.string.nonEmpty.maxLength(40),
          description: ow.string.nonEmpty.maxLength(200),
          bio: ow.string.nonEmpty.maxLength(200),
          trivia: ow.string.nonEmpty.maxLength(200)
        }),
        pic: ow.object.exactShape({
          name: ow.string.nonEmpty.maxLength(40),
          facebook: ow.string.nonEmpty.maxLength(100),
          email: ow.optional.string.matches(EMAIL_REGEX)
        })
      })
    )
  } catch (error) {
    console.error(error)
    res.status(400).send('Bad Request')
    return
  }

  console.log(body)
  res.status(200).send('OK')
}
