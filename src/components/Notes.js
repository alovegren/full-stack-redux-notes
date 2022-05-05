import { useDispatch, connect } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';

const Note = ({ note, handleClick}) => (
  <li onClick={handleClick}>
    {note.content}
    <strong>{note.important ? 'important' : ''}</strong>
  </li>
);

const Notes = (props) => {
  return (
    <ul>
      {props.notes.map(note => 
        <Note
          key={note.id} 
          note={note}
          handleClick={() => props.toggleImportanceOf(note.id)}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  switch (state.filter) {
    case "IMPORTANT":
      return { notes: state.notes.filter(note => note.important) };
    case "NOT_IMPORTANT":
      return { notes: state.notes.filter(note => !note.important) };
    default:
      return { notes: state.notes };
  }
}

const mapDispatchToProps = {
  toggleImportanceOf,
}

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Notes);

export default ConnectedNotes;