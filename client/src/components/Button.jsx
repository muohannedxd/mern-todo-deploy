export default function Button(props) {
  const {title, type, onclick} = props

  return (
    <div className={` text-white font-semibold px-6 py-2 rounded-lg cursor-pointer 
        ${type=='add' ? 'bg-add' : 'bg-close'}`} onClick={onclick}>
      {title}
    </div>
  )
}
