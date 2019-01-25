/*
 *
 * PictogramView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import Pictogram from 'components/Pictogram'
import { pictogram } from 'containers/PictogramView/actions'
import P from 'components/P'
import api, { downloadCustomPictogram } from 'services'
import { makePictogramByIdSelector } from './selectors'
import messages from './messages'

class PictogramView extends PureComponent {
  componentDidMount() {
    const { params, pictogramData } = this.props
    if (pictogramData.isEmpty()) {
      this.props.requestPictogram(params.idPictogram, params.locale)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.idPictogram !== nextProps.params.idPictogram) {
      this.props.requestPictogram(
        nextProps.params.idPictogram,
        this.props.params.locale
      )
    }
  }
  handleDownload = (fileName, base64Data) => {
    const promiseFileName = api.GENERATE_CUSTOM_PICTOGRAM({
      fileName,
      base64Data
    })
    promiseFileName.then((data) => {
      const location = downloadCustomPictogram(data.fileName)
      window.location = location
      // window.open(downloadCustomPictogram(data.fileName), '_blank')
    })
  }

  renderContent() {
    const {
      pictogramData,
      loading,
      params: { locale, searchText }
    } = this.props
    if (loading) {
      return (
        <p>
          <FormattedMessage {...messages.pictogramLoading} />
        </p>
      )
    }
    return pictogramData.isEmpty() ? (
      <P>
        <FormattedMessage {...messages.pictogramNotFound} />{' '}
      </P>
    ) : (
      <Pictogram
        pictogram={pictogramData}
        locale={locale}
        searchText={searchText || ''}
        onDownload={this.handleDownload}
        onLanguageChange={this.handleLanguageChange}
      />
    )
  }

  render() {
    return (
      <View left={true} right={true} top={0}>
        <Helmet
          title='PictogramView'
          meta={[
            { name: 'description', content: 'Description of PictogramView' }
          ]}
        />
        {this.renderContent()}
      </View>
    )
  }
}

PictogramView.propTypes = {
  requestPictogram: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  pictogramData: PropTypes.object,
  loading: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  const pictogramData = makePictogramByIdSelector()(state, ownProps)
  const loading = state.getIn(['pictogramsView', 'loading'])
  return {
    pictogramData,
    loading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestPictogram: (idPictogram) => {
    dispatch(pictogram.request(idPictogram, ownProps.params.locale))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictogramView)
