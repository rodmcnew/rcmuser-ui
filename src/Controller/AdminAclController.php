<?php

namespace RcmUser\Ui\Controller;

use RcmUser\Provider\RcmUserAclResourceProvider;

/**
 * Class AdminAclController
 *
 * AdminAclController
 *
 * PHP version 5
 *
 * @category  Reliv
 * @package   RcmUser\Ui\Controller
 * @author    James Jervis <jjervis@relivinc.com>
 * @copyright 2014 Reliv International
 * @license   License.txt New BSD License
 * @version   Release: <package_version>
 * @link      https://github.com/reliv
 */
class AdminAclController extends AbstractAdminController
{
    /**
     * indexAction
     *
     * @return array
     */
    public function indexAction()
    {
        // ACCESS CHECK
        if (!$this->isAllowed(
            RcmUserAclResourceProvider::RESOURCE_ID_ACL
        )
        ) {
            return $this->getNotAllowedResponse();
        }

        $viewArr = [];

        return $this->buildView($viewArr);
    }
}
