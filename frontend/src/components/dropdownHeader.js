import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'

export default function DropdownHeader({user}) {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    return (
      <div className='relative inline-block text-left'>
        {user.role !== 'user' ? 
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className='text-white font-medium text-sm mr-4'>
                Hi, {user && user.name}
            </Menu.Button>
          </div>
    
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/dashboard"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Dashboard
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      : 
      <div className="relative inline-block text-left">
        <Link to="/profile" className='text-white font-medium text-sm mr-4'>
          Hi, {user && user.name}
        </Link>
      </div>}
      </div>
      )
}