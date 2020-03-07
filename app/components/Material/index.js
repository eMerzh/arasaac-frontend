import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'components/Divider'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import ActivityIcon from 'material-ui/svg-icons/action/input'
import AreaIcon from 'material-ui/svg-icons/social/school'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Download from 'material-ui/svg-icons/action/get-app'
import Person from 'material-ui/svg-icons/social/person'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import ImageSlider from 'components/ImageSlider'
import muiThemeable from 'material-ui/styles/muiThemeable'
import P from 'components/P'
import activities from 'data/activities'
import areas from 'data/areas'
import { MATERIALS_URL } from 'services/config'
import langMessages from 'components/LanguageSelector/messages'
import { DEFAULT_AVATAR_PICTURE } from 'utils/index'
import messages from './messages'

const styles = {
  desc: {
    flexGrow: 3,
    width: '500px',
    padding: '2rem',
    textAlign: 'justify'
  },
  chip: {
    margin: '4px'
  },
  slides: {
    flexGrow: 1,
    width: '600px',
    position: 'relative'
  },
  snippet: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap-reverse'
  },
  button: {
    margin: '0 auto'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}
class Material extends Component {
  state = {
    language: this.props.locale
  }

  handleChange = (event, value) => { this.setState({ language: value }) }

  render() {
    const { material, locale } = this.props
    const images = [...material.get('commonScreenshots') || [], ...material.getIn(['screenshots', locale]) || []]
    const files = [...material.get('commonFiles') || [], ...material.getIn(['files', locale]) || []]
    // migration hack: if just one language and not under its language directory, it is compress under xx locale code
    const zipFile = material.getIn(['file', locale]) || material.getIn(['file', 'xx'])
    const authors = material.get('authors')
    const idMaterial = material.get('idMaterial')
    let title, desc
    /* get material languages */
    const languages = []
    material.get('translations').forEach((translation) => {
      languages.push(translation.get('lang'))
      /* init title and desc with first translation */
      /* if another translation fits locale, we change it */
      if (!title) {
        title = translation.get('title')
      } else {
        if (translation.get('lang') === locale) {
          title = translation.get('title')
          desc = translation.get('desc')
        }
      }
      if (!desc) {
        desc = translation.get('desc')
        if (translation.get('lang') === locale) {
          title = translation.get('title')
          desc = translation.get('desc')
        }
      }
    })



    const activityTags = material.get('activities') && material.get('activities').map((id) => (
      <Chip style={styles.chip} key={id}>
        <Avatar icon={<ActivityIcon />} />
        {activities.filter(item => item.code === id)[0].text}
      </Chip>
    ))
    const areaTags = material.get('areas') && material.get('areas').map((id) => (
      <Chip style={styles.chip} key={id}>
        <Avatar icon={<AreaIcon />} />
        {areas.filter(item => item.code === id)[0].text}
      </Chip>
    ))

    return (
      <div>
        <H2 primary ucase>{title}</H2>
        <div style={styles.snippet}>
          <ImageSlider images={images} id={idMaterial} style={styles.slides} />
          <div style={styles.desc}>
            <P>{desc}</P>
            <p style={{ textAlign: 'center' }}>
              <a href={`${MATERIALS_URL}/${idMaterial}/${zipFile}`}>
                <RaisedButton label={<FormattedMessage {...messages.zipFileLabel} />} primary={true} style={styles.button} />
              </a>
            </p>

          </div>
        </div>
        <H3 primary={true}>{<FormattedMessage {...messages.shareMaterial} />}</H3>
        <Divider />
        <p>
          <ShareBar shareUrl={window.location.href} title={title} image={'http://www.arasaac.org/images/arasaac_titulo.png'} />
        </p>
        <H3 primary={true}>{<FormattedMessage {...messages.activities} />}</H3>
        <Divider />
        <div style={styles.wrapper}>
          {activityTags}
        </div>
        <H3 primary={true}>{<FormattedMessage {...messages.areas} />}</H3>
        <Divider />
        <div style={styles.wrapper}>
          {areaTags}
        </div>
        <H3 primary={true}>{<FormattedMessage {...messages.languages} />}</H3>
        <Divider />
        {console.log(languages)}
        <RadioButtonGroup name='languages' defaultSelected={this.state.language} onChange={this.handleChange}>
          {languages.map((language) => (
            <RadioButton
              key={language}
              value={language}
              label={<FormattedMessage {...langMessages[language]} />}
              style={styles.radioButton}
            />
          )
          )}
        </RadioButtonGroup>

        <H3 primary={true}>{<FormattedMessage {...messages.authors} />}</H3>
        <Divider />
        <List>

          {authors.valueSeq().map((authorData) => {
            const role = authorData.get('role') || 'author'
            const author = authorData.get('author')
            return (
              <ListItem
                key={author.get('id')}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={DEFAULT_AVATAR_PICTURE} style={{ width: '50px', height: '50px', marginRight: '25px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <P important={true} style={{ marginBottom: '5px' }}>{author.get('name')}</P>
                    <span style={{ color: 'darkGrey', fontSize: '0.9rem' }}>{role}</span>
                  </div>
                </div>
                <P>



                </P>
              </ListItem>
            )
          }
          )}
        </List>
        <H3 primary={true}>{<FormattedMessage {...messages.files} />}</H3>
        <Divider />
        {files.map((file) =>
          <FlatButton
            key={file}
            label={file}
            labelPosition='after'
            icon={<Download />}
            href={`${MATERIALS_URL}/${idMaterial}/${file}`}
          />
        )}
      </div>
    )
  }
}


Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
}

export default muiThemeable()(Material)
