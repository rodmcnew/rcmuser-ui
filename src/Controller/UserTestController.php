<?php

namespace RcmUser\Ui\Controller;

use RcmUser\Provider\RcmUserAclResourceProvider;
use Zend\Http\Response;
use Zend\Mvc\Controller\AbstractActionController;

/**
 * UserController
 *
 * UserController
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
class UserTestController extends AbstractActionController
{
    /**
     * indexAction
     *
     * @return array
     */
    public function indexAction()
    {

        $isAllowed = $this->rcmUserIsAllowed(
            RcmUserAclResourceProvider::RESOURCE_ID_ROOT,
            null,
            RcmUserAclResourceProvider::PROVIDER_ID
        );

        if (!$isAllowed) {

            $response = $this->getResponse();
            $response->setStatusCode(Response::STATUS_CODE_401);
            $response->setContent(
                $response->renderStatusLine()
            );

            return $response;
        }

        $test = [
            'userController' => $this,
            'doTest' => false,
            'dumpUser' => false,
        ];

        return $test;
    }
}
