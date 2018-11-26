import React, { PureComponent } from 'react'

export default class CoverData extends PureComponent {
  state = {
    title: '',
    artist: '',
    album: '',
    year: '',
    genre: '',
    comment: '',
    editable: false,
  }

  handleChange = (event) => {
    const id = event.target.id; 
    const value = event.target.value;
    const { editable } = this.state;

    switch (id) {
      case 'title':
        console.log(this.state.editable);
        if (editable) {
          this.setState({ title: value });
        }
        break;
      case 'artist':
        if (editable) {
          this.setState({ artist: value });
        }
        break
      case 'album':
        if (editable) {
          this.setState({ album: value });
        }
        break
      case 'year':
        if (editable) {
          this.setState({ year: value });
        }
        break
      case 'genre':
        if (editable) {
          this.setState({ genre: value });
        }
        break
      case 'comment':
        if (editable) {
          this.setState({ comment: value });
        }
        break
      default:
        break;
    }
  }

  handleEdit = () => {
    this.setState({ editable: true });
  }

  componentWillReceiveProps (props) {
    const { data } = props;
    this.setState({
      title: data.title,
      artist: data.artist,
      album: data.album,
      year: data.year,
      genre: data.genre,
      comment: data.comment,
    });
  }

  render() {
    return (
      <div>
        <div className="buttons-edit">
          <div className="buttons-edit--btn"></div>
          <div
            className="buttons-edit--btn"
            onClick={this.handleEdit} >
          </div>
        </div>
        <form>
          <div className="cover-data--item">
            <div className="cover-data--icon">
              <img src={'img/title-icon.png'} alt={this.state.title} />
            </div>
            <div className="cover-data--value">
              <input
                className="cover-data--input"
                id="title"
                name="titleSong"
                value={this.state.title}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="cover-data--item">
            <div className="cover-data--icon">
              <img src={'img/artist-icon.png'} alt={this.state.artist} />
            </div>
            <div className="cover-data--value">
              <input
                className="cover-data--input"
                id="artist"
                name="artistSong"
                value={this.state.artist}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="cover-data--item">
            <div className="cover-data--icon">
              <img src={'img/album-icon.png'} alt={this.state.album} />
            </div>
            <div className="cover-data--value">
              <input
                className="cover-data--input"
                id="album"
                name="albumSong"
                value={this.state.album}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="cover-data--item">
            <div className="cover-data--icon">
              <img src={'img/year-icon.png'} alt={this.state.year} />
            </div>
            <div className="cover-data--value">
              <input
                className="cover-data--input"
                id="year"
                name="yearSong"
                value={this.state.year}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="cover-data--item">
            <div className="cover-data--icon">
              <img src={'img/genre-icon.png'} alt={this.state.genre} />
            </div>
            <div className="cover-data--value">
              <input
                className="cover-data--input"
                id="genre"
                name="genreSong"
                value={this.state.genre}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="cover-data--item">
            <div className="cover-data--icon">
              <img src={'img/comment-icon.png'} alt={this.state.comment} />
            </div>
            <div className="cover-data--value">
              <input
                className="cover-data--input"
                id="comment"
                name="commentSong"
                value={this.state.comment}
                onChange={this.handleChange} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
